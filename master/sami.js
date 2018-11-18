
window.projectVersion = 'master';

(function(root) {

    var bhIndex = null;
    var rootPath = '';
    var treeHtml = '        <ul>                <li data-name="namespace:Plasma" class="opened">                    <div style="padding-left:0px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="Plasma.html">Plasma</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:Plasma_BinaryBuffer" class="opened">                    <div style="padding-left:26px" class="hd leaf">                        <a href="Plasma/BinaryBuffer.html">BinaryBuffer</a>                    </div>                </li>                </ul></div>                </li>                </ul>';

    var searchTypeClasses = {
        'Namespace': 'label-default',
        'Class': 'label-info',
        'Interface': 'label-primary',
        'Trait': 'label-success',
        'Method': 'label-danger',
        '_': 'label-warning'
    };

    var searchIndex = [
                    
            {"type": "Namespace", "link": "Plasma.html", "name": "Plasma", "doc": "Namespace Plasma"},
            
            {"type": "Class", "fromName": "Plasma", "fromLink": "Plasma.html", "link": "Plasma/BinaryBuffer.html", "name": "Plasma\\BinaryBuffer", "doc": "&quot;A binary buffer takes binary data and buffers it. Several methods are available to get specific data.&quot;"},
                                                        {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method___construct", "name": "Plasma\\BinaryBuffer::__construct", "doc": "&quot;Constructor.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_append", "name": "Plasma\\BinaryBuffer::append", "doc": "&quot;Append data to the buffer.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_prepend", "name": "Plasma\\BinaryBuffer::prepend", "doc": "&quot;Prepends data to the buffer.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_slice", "name": "Plasma\\BinaryBuffer::slice", "doc": "&quot;Slice the buffer and only keep a subset.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_getSize", "name": "Plasma\\BinaryBuffer::getSize", "doc": "&quot;Get the buffer size\/length.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_getContents", "name": "Plasma\\BinaryBuffer::getContents", "doc": "&quot;Get the contents.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_clear", "name": "Plasma\\BinaryBuffer::clear", "doc": "&quot;Clears the buffer.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readInt1", "name": "Plasma\\BinaryBuffer::readInt1", "doc": "&quot;Parses a 1 byte \/ 8 bit integer (0 to 255).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readInt2", "name": "Plasma\\BinaryBuffer::readInt2", "doc": "&quot;Parses a 2 byte \/ 16 bit integer (0 to 64 K \/ 0xFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readInt3", "name": "Plasma\\BinaryBuffer::readInt3", "doc": "&quot;Parses a 3 byte \/ 24 bit integer (0 to 16 M \/ 0xFFFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readInt4", "name": "Plasma\\BinaryBuffer::readInt4", "doc": "&quot;Parses a 4 byte \/ 32 bit integer (0 to 4 G \/ 0xFFFFFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readInt8", "name": "Plasma\\BinaryBuffer::readInt8", "doc": "&quot;Parses a 8 byte \/ 64 bit integer (0 to 2^64-1).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readFloat", "name": "Plasma\\BinaryBuffer::readFloat", "doc": "&quot;Reads a single precision float.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readDouble", "name": "Plasma\\BinaryBuffer::readDouble", "doc": "&quot;Reads a double precision float.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readIntLength", "name": "Plasma\\BinaryBuffer::readIntLength", "doc": "&quot;Parses length-encoded binary integer from the MySQL protocol.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readStringLength", "name": "Plasma\\BinaryBuffer::readStringLength", "doc": "&quot;Parses a length-encoded binary string from the MySQL protocol. If length is null, &lt;code&gt;null&lt;\/code&gt; will be returned.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_readStringNull", "name": "Plasma\\BinaryBuffer::readStringNull", "doc": "&quot;Reads NULL-terminated C string.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeInt1", "name": "Plasma\\BinaryBuffer::writeInt1", "doc": "&quot;Writes a 1 byte \/ 8 bit integer (0 to 255).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeInt2", "name": "Plasma\\BinaryBuffer::writeInt2", "doc": "&quot;Writes a 2 bytes \/ 16 bit integer (0 to 64 K \/ 0xFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeInt3", "name": "Plasma\\BinaryBuffer::writeInt3", "doc": "&quot;Writes a 3 byte \/ 24 bit integer (0 to 16 M \/ 0xFFFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeInt4", "name": "Plasma\\BinaryBuffer::writeInt4", "doc": "&quot;Writes a 4 byte \/ 32 bit integer (0 to 4 G \/ 0xFFFFFFFF).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeInt8", "name": "Plasma\\BinaryBuffer::writeInt8", "doc": "&quot;Writes a 8 byte \/ 64 bit integer (0 to 2^64-1).&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeFloat", "name": "Plasma\\BinaryBuffer::writeFloat", "doc": "&quot;Writes a single precision float.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeDouble", "name": "Plasma\\BinaryBuffer::writeDouble", "doc": "&quot;Writes a double precision float.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_writeStringLength", "name": "Plasma\\BinaryBuffer::writeStringLength", "doc": "&quot;Builds length-encoded binary string from the MySQL protocol.&quot;"},
                    {"type": "Method", "fromName": "Plasma\\BinaryBuffer", "fromLink": "Plasma/BinaryBuffer.html", "link": "Plasma/BinaryBuffer.html#method_read", "name": "Plasma\\BinaryBuffer::read", "doc": "&quot;Reads a specified length from the buffer (and discards the read part from the buffer).&quot;"},
            
                                        // Fix trailing commas in the index
        {}
    ];

    /** Tokenizes strings by namespaces and functions */
    function tokenizer(term) {
        if (!term) {
            return [];
        }

        var tokens = [term];
        var meth = term.indexOf('::');

        // Split tokens into methods if "::" is found.
        if (meth > -1) {
            tokens.push(term.substr(meth + 2));
            term = term.substr(0, meth - 2);
        }

        // Split by namespace or fake namespace.
        if (term.indexOf('\\') > -1) {
            tokens = tokens.concat(term.split('\\'));
        } else if (term.indexOf('_') > 0) {
            tokens = tokens.concat(term.split('_'));
        }

        // Merge in splitting the string by case and return
        tokens = tokens.concat(term.match(/(([A-Z]?[^A-Z]*)|([a-z]?[^a-z]*))/g).slice(0,-1));

        return tokens;
    };

    root.Sami = {
        /**
         * Cleans the provided term. If no term is provided, then one is
         * grabbed from the query string "search" parameter.
         */
        cleanSearchTerm: function(term) {
            // Grab from the query string
            if (typeof term === 'undefined') {
                var name = 'search';
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var results = regex.exec(location.search);
                if (results === null) {
                    return null;
                }
                term = decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            return term.replace(/<(?:.|\n)*?>/gm, '');
        },

        /** Searches through the index for a given term */
        search: function(term) {
            // Create a new search index if needed
            if (!bhIndex) {
                bhIndex = new Bloodhound({
                    limit: 500,
                    local: searchIndex,
                    datumTokenizer: function (d) {
                        return tokenizer(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace
                });
                bhIndex.initialize();
            }

            results = [];
            bhIndex.get(term, function(matches) {
                results = matches;
            });

            if (!rootPath) {
                return results;
            }

            // Fix the element links based on the current page depth.
            return $.map(results, function(ele) {
                if (ele.link.indexOf('..') > -1) {
                    return ele;
                }
                ele.link = rootPath + ele.link;
                if (ele.fromLink) {
                    ele.fromLink = rootPath + ele.fromLink;
                }
                return ele;
            });
        },

        /** Get a search class for a specific type */
        getSearchClass: function(type) {
            return searchTypeClasses[type] || searchTypeClasses['_'];
        },

        /** Add the left-nav tree to the site */
        injectApiTree: function(ele) {
            ele.html(treeHtml);
        }
    };

    $(function() {
        // Modify the HTML to work correctly based on the current depth
        rootPath = $('body').attr('data-root-path');
        treeHtml = treeHtml.replace(/href="/g, 'href="' + rootPath);
        Sami.injectApiTree($('#api-tree'));
    });

    return root.Sami;
})(window);

$(function() {

    // Enable the version switcher
    $('#version-switcher').change(function() {
        window.location = $(this).val()
    });

    
        // Toggle left-nav divs on click
        $('#api-tree .hd span').click(function() {
            $(this).parent().parent().toggleClass('opened');
        });

        // Expand the parent namespaces of the current page.
        var expected = $('body').attr('data-name');

        if (expected) {
            // Open the currently selected node and its parents.
            var container = $('#api-tree');
            var node = $('#api-tree li[data-name="' + expected + '"]');
            // Node might not be found when simulating namespaces
            if (node.length > 0) {
                node.addClass('active').addClass('opened');
                node.parents('li').addClass('opened');
                var scrollPos = node.offset().top - container.offset().top + container.scrollTop();
                // Position the item nearer to the top of the screen.
                scrollPos -= 200;
                container.scrollTop(scrollPos);
            }
        }

    
    
        var form = $('#search-form .typeahead');
        form.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'search',
            displayKey: 'name',
            source: function (q, cb) {
                cb(Sami.search(q));
            }
        });

        // The selection is direct-linked when the user selects a suggestion.
        form.on('typeahead:selected', function(e, suggestion) {
            window.location = suggestion.link;
        });

        // The form is submitted when the user hits enter.
        form.keypress(function (e) {
            if (e.which == 13) {
                $('#search-form').submit();
                return true;
            }
        });

    
});


