// Append jQuery to the document head
var jq = document.createElement('script');
jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

// Wait for jQuery to load, 5000ms sounds good
var init = setTimeout(function() {
    // Initialize jQuery
    jQuery.noConflict();

    // Click the cookie at 100 clicks per second until we're
    // generating 125 clicks per second via upgrades
    var cookieClickInterval = setInterval(function() {

        var cookieInfo = jQuery('#cookies').text();
        var cookieInfoArr = cookieInfo.split(' ');
        var cookiesPerSecond = cookieInfoArr[cookieInfoArr.length - 1];

        // I was originally using these to determine when to keep clicking
        // but I think that clicksPerSecond is a better measure
        // var cookieInfoWithoutCommas = cookieInfo.replace(/,/g, '');
        // var numberOfCookies = parseInt(cookieInfoWithoutCommas, 10);

        if (cookiesPerSecond < 125) {
            jQuery('#bigCookie').click();
        } else {
            clearInterval(cookieClickInterval);
        }
    }, 10);

    // @NOTE: Should this interval be watching to clear itself?
    // Maybe I should lower the timing on the interval depending on
    // how far along you are?
    var upgradeClickInterval = setInterval(function() {
        // Not sure how many purchase options there are in total
        // haven't played long enough to know
        var options = 12;

        for (var i = options - 1; i >= 0; i--) {
            var itemPrice = jQuery('#productPrice' + i);
            var itemQuantity = jQuery('#productOwned' + i);

            // If the option isn't available yet, break
            if (!itemPrice) {
                return;
            }

            // If the css of the option text is green, buy it
            if (itemPrice.css('color') === 'rgb(102, 255, 102)') {
                if (itemQuantity.text() < 5) {
                    itemPrice.click();
                }
            }
        };

        // Since we don't know anything about upgrade price
        // just try to buy the first enabled one every time
        // with leftover money after buying the main items
        var upgrade = jQuery('#upgrades .enabled')[0];
        if (upgrade) {
            upgrade.click();
        }
    }, 1000)
}, 5000);