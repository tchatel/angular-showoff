!SLIDE subsection

# Functions #

!SLIDE execute

# Function Statement #

    var coinReturn = [25, 25, 10];
    var coins = [];

    function isSufficientFunds(purchasePrice){
        var funds = 0;
        coinReturn.each(function(coin){
            funds+=coin;
        });
        return (funds >= purchasePrice);
    }

    result = isSufficientFunds(60);

!SLIDE execute

# Function Expression #
.notes function expression can be used anywhere that an expression is expected.
.notes Note the anonymous function expression parameter to the .each() method

	@@@ javaScript
    var coinReturn = [10, 5, 25];
    var coins = [];

    var isSufficientFunds = function(purPrice){
        var funds = 0;
        coinReturn.each(function(coin){
            funds+=coin;
        });
        return (funds >= purPrice);
    };

    result = isSufficientFunds(75);

!SLIDE transition=scrollUp
.notes example of passing functions as parameters

# Functions as parameters

    @@@ javaScript
    var coins = [];

    var makeChange = function(changeDue){
        coins.sort(function(a,b){
            return b-a;
        });

        // some other stuff...
    };


!SLIDE execute
.notes functions are objects, so they can have their own properties (including other functions!)

# Functions are objects, too #

	@@@ javaScript
    var foo = function(){return false;};
    foo.bar = function(){return true;};
    foo.baz = 3;

    result = foo();

!SLIDE execute

# Functions are objects, too #

	@@@ javaScript
    var foo = function(){return false;};
    foo.bar = function(){return true;};
    foo.baz = 3;

    result = foo.bar();
