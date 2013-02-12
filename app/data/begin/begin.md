!SLIDE subsection ================

# angular-showoff slides
### this is a *'subsection'* slide


!SLIDE ===========================

# Keyboard Shortcuts
### this is a normal slide

<table class="left">
 <tr><td class="red">→, ↓, ⇟, space</td>
     <td>next slide</td></tr>
 <tr><td class="red">←, ↑, ⇞</td>
     <td>previous slide</td></tr>
 <tr><td class="red">f</td>
     <td>toggle footer</td></tr>
 <tr><td class="red">r</td>
     <td>reload slides</td></tr>
 <tr><td class="red">+</td>
     <td>increase font size</td></tr>
 <tr><td class="red">-</td>
     <td>decrease font size</td></tr>
 <tr><td class="red">b</td>
     <td>toggle black background</td></tr>
 <tr><td class="red">a</td>
     <td>show all slides (click on a
         slide to navigate)</td></tr>
 <tr><td class="red">h, z</td>
     <td>toggle help (this)</td>
 </tr>
</table>


!SLIDE bullets ===================

# a *'bullets'* slide

* One
* Two
* Three


!SLIDE bullets ===================

# a *'bullets'* slide with an ordered list

1. One
2. Two
3. Three


!SLIDE code ======================

      <!-- full 'code' slide -->
      <script src="lib/marked/marked.js"></script>
      <script src="lib/angular/angular.js"></script>
      <script src="js/services.js"></script>
      <script src="js/controllers.js"></script>
      <script src="js/filters.js"></script>
      <script src="js/directives.js"></script>
      <script src="js/deferreddata.js"></script>
      <script src="js/app.js"></script>


!SLIDE ===========================

## Normal slide with some code blocks

    div.slide-content {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        padding: 20px;
    }

### another code block :

    Lexer.lex = function(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    };


!SLIDE smaller ===================

## Same slide but *'smaller'*

    div.slide-content {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        padding: 20px;
    }

### another code block :

    Lexer.lex = function(src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    };


!SLIDE bullets ===================

# Sizes

### You can use those classes : *small*, *smaller*, *smallest*, *big*, *bigger*, *biggest*

* on a whole slide
* on an <span class="bigger">HTML element</span> in a slide