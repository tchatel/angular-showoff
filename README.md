# angular-showoff

A presentation tool similar to [Scott Chacon's **Showoff**](https://github.com/schacon/showoff), but built with AngularJS.
As with ShowOff, you write the presentation slides in markdown syntax. But there is no server part, the tool is just a full client
web application.

*If you want to use it with Chrome, you must run a web server (Node.js for instance) to serve the files, as Chrome doesn't
allow scripts in a local HTML page to make HTTP requests. Or you can start Chrome with* --allow-file-access-from-files *flag
to disable this restriction. Firefox has no such restriction.*

This application uses the markdown parser named [marked](https://github.com/chjj/marked), from Christopher Jeffrey. It also
uses [google-code-prettify](https://code.google.com/p/google-code-prettify/) for syntax highlighting of source code.

[Demo is here.](http://tchatel.github.com/angular-showoff/)

## Usage

**angular-showoff** needs a config file *data/config.json*, which defines the presentation title, and the list of slides files.
Here is the sample *data/config.json* file :

    {
        "title": "angular-showoff demo",
        "sections": [
            {"file": "data/begin/begin.md"},
            {"file": "data/end/end.md"}
        ]
    }

This example loads two markdown files, containing the slides. Images referenced in the markdown files will be loaded from the
same directory as the markdown file. For instance, path *data/begin* will be used for images in *data/begin/begin.md*.

As with ShowOff, you may assemble a presentation from several parts. But there is no automatic discovery of markdown files
in subdirectories, you have to list all the markdown files in the config file.

The tool can show text, images, syntax highlighted code, bullet or numbered lists. It does not have transitions, nor incremental
lists.






