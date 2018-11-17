<?php
/**
 * Plasma Binary Buffer component
 * Copyright 2018 PlasmaPHP, All Rights Reserved
 *
 * Website: https://github.com/PlasmaPHP
 * License: https://github.com/PlasmaPHP/binary-buffer/blob/master/LICENSE
*/

namespace Plasma;

/**
 * A binary buffer takes binary data and buffers it. Several methods are available to get specific data.
 */
class BinaryBuffer {
    /**
     * @var string
     */
    protected $buffer;
    
    /**
     * @var bool
     */
    protected $gmp;
    
    function __construct() {
        $this->gmp = \extension_loaded('gmp');
    }
    
    /**
     * Append data to the buffer.
     * @param string  $data
     * @return void
     */
    function append(string $data): void {
        $this->buffer .= $data;
    }
    
    /**
     * Prepends data to the buffer.
     * @param string  $data
     * @return void
     */
    function prepend(string $data): void {
        $this->buffer = $this->buffer.$data;
    }
    
    /**
     * Get the buffer size/length.
     * @return int
     */
    function getSize(): int {
        return \strlen($this->buffer);
    }
    
    /**
     * Parses a 1 byte / 8 bit integer (0 to 255).
     * @return int
     */
    function readInt1(): int {
        return \ord($this->readBuffer(1));
    }
    
    /**
     * Parses a 2 byte / 16 bit integer (0 to 64 K / 0xFFFF).
     * @return int
     */
    function readInt2(): int {
        return \unpack('v', $this->readBuffer(2))[1];
    }
    
    /**
     * Parses a 3 byte / 24 bit integer (0 to 16 M / 0xFFFFFF).
     * @return int
     */
    function readInt3(): int {
        return \unpack('V', $this->readBuffer(3)."\0")[1];
    }
    
    /**
     * Parses a 4 byte / 32 bit integer (0 to 4 G / 0xFFFFFFFF).
     * @return int
     */
    function readInt4(): int {
        return \unpack('V', $this->readBuffer(4))[1];
    }
    
    /**
     * Parses a 8 byte / 64 bit integer (0 to 2^64-1).
     * @return int|string
     */
    function readInt8() {
        $strInt = $this->readBuffer(8);
        
        if(\PHP_INT_SIZE > 4) {
            return \unpack('P', $strInt)[1];
        }
        
        if($this->gmp) {
            $result = \gmp_add(0, \unpack('n', \substr($strInt, 0, 2)));
            $result = \gmp_mul($result, '65536');
            $result = \gmp_add($result, \unpack('n', \substr($strInt, 2, 2)));
            $result = \gmp_mul($result, '65536');
            $result = \gmp_add($result, \unpack('n', \substr($strInt, 4, 2)));
            $result = \gmp_mul($result, '65536');
            $result = \gmp_add($result, \unpack('n', \substr($strInt, 6, 2)));
            
            if(\gmp_cmp($result, '9223372036854775808') !== -1) {
                $result = \gmp_sub($result, '18446744073709551616'); // $result -= (1 << 64)
            }
        } else {
            $result = \bcadd('0', \unpack('n', \substr($strInt, 0, 2)));
            $result = \bcmul($result, '65536');
            $result = \bcadd($result, \unpack('n', \substr($strInt, 2, 2)));
            $result = \bcmul($result, '65536');
            $result = \bcadd($result, \unpack('n', \substr($strInt, 4, 2)));
            $result = \bcmul($result, '65536');
            $result = \bcadd($result, \unpack('n', \substr($strInt, 6, 2)));
            
            // 9223372036854775808 is equal to (1 << 63)
            if(\bccomp($result, '9223372036854775808') !== -1) {
                $result = \bcsub($result, '18446744073709551616'); // $result -= (1 << 64)
            }
        }
        
        return $result;
    }
    
    /**
     * Parses length-encoded binary integer from the MySQL protocol.
     * Returns the decoded integer 0 to 2^64 or `null` for special null int.
     * @return int|null
     */
    function readIntLength(): ?int {
        $f = $this->readInt1($buffer);
        if($f <= 250) {
            return $f;
        }
        
        if($f === 251) {
            return null;
        }
        
        if($f === 252) {
            return $this->readInt2($buffer);
        }
        
        if($f === 253) {
            return $this->readInt3($buffer);
        }
        
        return $this->readInt8($buffer);
    }
    
    /**
     * Parses a length-encoded binary string from the MySQL protocol. If length is null, `null` will be returned.
     * @param int|null  $length
     * @return string|null
     */
    function readStringLength(?int $length = null): ?string {
        $length = ($length !== null ? $length : $this->readIntLength($buffer));
        if($length === null) {
            return null;
        }
        
        return $this->readBuffer($length);
    }
    
    /**
     * Reads NULL-terminated C string.
     * @return string
     * @throws \InvalidArgumentException
     */
    function readStringNull(): string {
        $pos = \strpos("\0");
        if($pos === false) {
            throw new \InvalidArgumentException('Missing NULL character');
        }
        
        $str =  $this->readBuffer($pos);
        $this->readBuffer(1); // discard NULL byte
        
        return $str;
    }
    
    /**
     * Writes a 1 byte / 8 bit integer (0 to 255).
     * @param int  $int
     * @return string
     */
    function writeInt1(int $int): string {
        return \chr($int);
    }
    
    /**
     * Writes a 2 bytes / 16 bit integer (0 to 64 K / 0xFFFF).
     * @param int  $int
     * @return string
     */
    function writeInt2(int $int): string {
        return \pack('v', $int);
    }
    
    /**
     * Writes a 3 byte / 24 bit integer (0 to 16 M / 0xFFFFFF).
     * @param int  $int
     * @return string
     */
    function writeInt3(int $int): string {
        return \substr(\pack('V', $int), 0, 3);
    }
    
    /**
     * Writes a 4 byte / 32 bit integer (0 to 4 G / 0xFFFFFFFF).
     * @param int  $int
     * @return string
     */
    function writeInt4(int $int): string {
        return \pack('V', $int);
    }
    
    /**
     * Writes a 8 byte / 64 bit integer (0 to 2^64-1).
     * @param string|int  $int
     * @return string
     */
    function writeInt8($int): string {
        if(\PHP_INT_SIZE > 4) {
            return \pack('P', ((int) $int));
        }
        
        if($this->gmp) {
            if(\gmp_cmp($int, '0') === -1) {
                // 18446744073709551616 is equal to (1 << 64)
                $int = \gmp_add($int, '18446744073709551616');
            }
            
            return \pack('v', \gmp_mod(\gmp_div($int, '281474976710656'), '65536')).
                \pack('v', \gmp_mod(\gmp_div($int, '4294967296'), '65536')).
                \pack('v', \gmp_div($int, '65536'), '65536').
                \pack('v', \gmp_mod($int, '65536'));
        }
        
        if(\bccomp($int, '0') === -1) {
            // 18446744073709551616 is equal to (1 << 64)
            $int = \bcadd($int, '18446744073709551616');
        }
        
        return \pack('v', \bcmod(\bcdiv($int, '281474976710656'), '65536')).
            \pack('v', \bcmod(\bcdiv($int, '4294967296'), '65536')).
            \pack('v', \bcdiv($int, '65536'), '65536').
            \pack('v', \bcmod($int, '65536'));
    }
    
    /**
     * Writes a single precision float.
     * @param float  $float
     * @return string
     */
    function writeFloat(float $float): string {
        return \pack('g', $float);
    }
    
    /**
     * Writes a double precision float.
     * @param float  $float
     * @return string
     */
    function writeDouble(float $float): string {
        return \pack('e', $float);
    }
    
    /**
     * Builds length-encoded binary string from the MySQL protocol.
     * @param string|null  $s
     * @return string
     */
    function writeStringLength(?string $s): string {
        if($s === NULL) {
            // \xFB (251)
            return "\xFB";
        }
        
        $l = \strlen($s);
        if($l <= 250) {
            return $this->writeInt1($l).$s;
        }
        
        if($l <= 0xFFFF) { // max 2^16: \xFC (252)
            return "\xFC".$this->writeInt2($l).$s;
        }
        
        if($l <= 0xFFFFFF) { // max 2^24: \xFD (253)
            return "\xFD".$this->writeInt3($l).$s;
        }
        
        return "\xFE".$this->writeInt8($l).$s; // max 2^64: \xFE (254)
    }
    
    /**
     * Reads a specified length from the buffer (and discards the read part from the buffer).
     * @param int  $length
     * @return string
     * @throws \InvalidArgumentException
     */
    function readBuffer(int $length): string {
        if(\strlen($this->buffer) < $length) {
            throw new \InvalidArgumentException('Trying to read behind buffer, requested '.$length.' bytes, only got '.\strlen($buffer).' bytes');
        }
        
        $str = \substr($this->buffer, 0, $length);
        $this->buffer = \substr($this->buffer, $length);
        
        return $str;
    }
}
