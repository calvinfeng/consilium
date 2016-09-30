const React = require('react');

const Gist = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },

    shouldComponentUpdate: function(nextProps) {
        return this.props.id !== nextProps.id;
    },

    componentDidMount: function() {
        this._updateIframeContent();
    },
    componentDidUpdate: function(prevProps, prevState) {
        this._updateIframeContent();
    },

    _updateIframeContent: function() {
        let iframe = this.refs.iframe;

        let doc = iframe.document;
        if (iframe.contentDocument) doc = iframe.contentDocument;
        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

        let gistScript = '<script type="text/javascript" src="https://gist.github.com/' +
          this.props.id + '.js"></script>';
        let styles = '<style>*{font-size:12px;}</style>';
        let resizeScript = 'onload="parent.document.getElementById(\'gist-' +
          this.props.id + '\').style.height=document.body.scrollHeight + \'px\'"';
        let iframeHtml = '<html><head><base target="_parent">'
          +styles+'</head><body '+resizeScript+'>'+gistScript+'</body></html>';

        doc.open();
        doc.writeln(iframeHtml);
        doc.close();
    },

    render: function() {
        return React.createElement('iframe', {
            ref: 'iframe',
            width: '100%',
            frameBorder: 0,
            id: "gist-" + this.props.id
        });
    }
});

module.exports = Gist;
