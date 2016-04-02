# robin anti-spam auto-vote

This anti-spam robot works differently than the others currently available. Instead of trying to keep a list of all the things that spammers say, this script looks at each message and counts the number of uppercase letters, lowercase letters, and non-word characters (e.g. :poop: ) If the message is all caps, it gets marked as spam. If the message has more non-word characters than word characters then the message is marked as spam.

You can tweak the allowed ratios of uppercase to lowercase and percentage of non-word characters. Open the js file and look for the two lines near the top:

    var percentNonWordCharactersAllowed = .25;
    var ratioUppercaseToLowercase = .25;

There is also the old-style blacklist filter. You can add words to the ``filter`` variable. 

#performance

This script binds to the DOM event instead of running a check at an interval. That means the code only runs when it needs to, instead of polling all the time, and the UI is updated seamlessly. The spam never appears to be then hidden later. It never shows up at all.

# install
You need to install Tampermonkey 