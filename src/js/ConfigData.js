import React from 'react';

export default {
    countdownDuration: 30000,
    warningCount: 10000,
    blurMax: 8,
    gameLogo: (<div id="game-logo"><img src="img/misc/aabcs-logo-anim.gif" alt="The AABCs" /></div>),
    copyright: (<div className="copyright">Brought to you by <a href="http://proof-advertising.com" target="_blank">Proof Advertising</a></div>),
    nextMessages: [
        'Try to name the next cocktail.',
        'Nobody’s perfect. See if you know the next one.',
        'You obviously don’t know that one. Let’s move along.',
        'Time’s up. Move on to the next letter.',
        'Let’s just go to the next cocktail, shall we?',
        'Take a shot to cleanse your palate and try the next letter.'
    ],
    endGameMessages: {
        5: {
            title: 'Sober Companion',
            message: 'You got {count} cocktails right. Or, put another way, you got almost all of them wrong. You’re either 10 years old or drink like you are.',
            share: 'I played the AABC’s of Cocktails and got so many wrong, I might just be a Sober Companion.'
        },
        15: {
            title: 'Amateur Drinker',
            message: 'You got {count} cocktails right. Not bad. But let’s be honest, not amazing either.',
            share: 'I played the AABC’s of Cocktails and it turns out I’m an Amateur Drinker. Think you know more than me?'
        },
        20: {
            title: 'Boozehound',
            message: 'You got {count} cocktails right. Congrats.',
            share: 'I played the AABC’s of Cocktails and it turns out I’m a Boozehound. Think you know more than me?'
        },
        25: {
            title: 'Full-Blown Alcoholic',
            message: 'You got {count} cocktails right. Congratulations, sir or madam.',
            share: 'I played the AABC’s of Cocktails and it turns out I’m a Full-Blown Alcoholic. See if you are, too.'
        },
        26: {
            title: 'Mixologist',
            message: 'You know every single letter of the drinking alphabet. You’re either a bartender, or you should quit your day job and become one.',
            share: 'I played the AABC’s of Cocktails and got every answer right. See if you can match me. You probably can’t.'
        }
    },
    share: {
        title: 'The AABC’s of Cocktails',
        baseUrl: 'http://theaabcs.com',
        image: 'share/theaabc_cocktail_share_{letter}.jpg',
        copy: 'I know my AABC’s of Cocktails, like the {recipe}. Check out the recipe and play the game.',
        hashtags: 'theaabcs'
    },
    coasters: [
        {
            letter: 'a',
            name: 'Atomic Bomb',
            altAnswers: [
                'a bomb',
                'atom bomb',
                'a-bomb',
                'atomicbomb',
                'abomb',
                'atom bomb'
            ],
            image: 'drink-a.png',
            recipe: {
                heading: 'drink-a-recipe-1.png',
                body: 'drink-a-recipe-2.png'
            },
            responses: [
                'Looks like A is for Amateur. Guess again.',
                'Well it\'s not a Jager Bomb...',
                'Seriously? #ComeBackInAFewYears'
            ]
        },
        {
            letter: 'b',
            name: 'Bloody Mary',
            altAnswers: [
                'bloodymary'
            ],
            image: 'drink-b.png',
            recipe: {
                heading: 'drink-b-recipe-1.png',
                body: 'drink-b-recipe-2.png'
            },
            responses: [
                'Vodka. Tomato juice...',
                'Have you ever even been to brunch?',
                'Maybe this test isn\'t for you.'
            ]
        },
        {
            letter: 'c',
            name: 'Cosmopolitan',
            altAnswers: [
                'cosmo',
                'cosmopoliten',
                'cosmapolitan'
            ],
            image: 'drink-c.png',
            recipe: {
                heading: 'drink-c-recipe-1.png',
                body: 'drink-c-recipe-2.png'
            },
            responses: [
                'It\'s that pink martini looking thing.',
                'Practically a featured role on Sex & the City.',
                'Also the name of a magazine.'
            ]
        },
        {
            letter: 'd',
            name: 'Dark and Stormy',
            altAnswers: [
                'dark & stormy',
                'dark&stormy',
                'darkandstormy'
            ],
            image: 'drink-d.png',
            recipe: {
                heading: 'drink-d-recipe-1.png',
                body: 'drink-d-recipe-2.png'
            },
            responses: [
                'Start with rum...',
                'Then add ginger beer...',
                'Then go back to the bar and learn to drink, apparently.'
            ]
        },
        {
            letter: 'e',
            name: 'El Diablo',
            altAnswers: [
                'eldiablo',
                'diablo'
            ],
            image: 'drink-e.png',
            recipe: {
                heading: 'drink-e-recipe-1.png',
                body: 'drink-e-recipe-2.png'
            },
            responses: [
                'What they might call Trump in Mexico.',
                'The devil, en Español.',
                'Oh just type in El Diablo, already.'
            ]
        },
        {
            letter: 'f',
            name: 'Fireball',
            altAnswers: [
                'fire ball'
            ],
            image: 'drink-f.png',
            recipe: {
                heading: 'drink-f-recipe-1.png',
                body: 'drink-f-recipe-2.png'
            },
            responses: [
                'Peach. Cinnamon. Hot sauce.',
                'In other words, spicy.',
                'Spicy.'
            ]
        },
        {
            letter: 'g',
            name: 'Gibson',
            altAnswers: [],
            image: 'drink-g.png',
            recipe: {
                heading: 'drink-g-recipe-1.png',
                body: 'drink-g-recipe-2.png'
            },
            responses: [
                'It\'s made with gin and vermouth...',
                'And an onion.',
                'C\'mon! Even hipsters know this one.'
            ]
        },
        {
            letter: 'h',
            name: 'Hurricane',
            altAnswers: [
                'huricane',
                'hurrikane'
            ],
            image: 'drink-h.png',
            recipe: {
                heading: 'drink-h-recipe-1.png',
                body: 'drink-h-recipe-2.png'
            },
            responses: [
                'It will rock you like itself.',
                'So you don\'t know drinks or 80\'s music.',
                'Check.'
            ]
        },
        {
            letter: 'i',
            name: 'Irish Car Bomb',
            altAnswers: [
                'irish carbomb'
            ],
            image: 'drink-i.png',
            recipe: {
                heading: 'drink-i-recipe-1.png',
                body: 'drink-i-recipe-2.png'
            },
            responses: [
                'Guiness, Jameson and a shot of Bailey\'s.',
                'Wow, someone never drank in college.',
                'Try again, laddy.'
            ]
        },
        {
            letter: 'j',
            name: 'Jellyfish',
            altAnswers: [
                'jelly fish'
            ],
            image: 'drink-j.png',
            recipe: {
                heading: 'drink-j-recipe-1.png',
                body: 'drink-j-recipe-2.png'
            },
            responses: [
                'It lives in the sea and starts with a J.',
                'Rhymes with Hellyfish.',
                'Seriously? Rhymes with Hellyfish and starts with J!'
            ]
        },
        {
            letter: 'k',
            name: 'Kamikaze',
            altAnswers: [
                'kamikazee',
                'kamakaze',
                'kamakazee'
            ],
            image: 'drink-k.png',
            recipe: {
                heading: 'drink-k-recipe-1.png',
                body: 'drink-k-recipe-2.png'
            },
            responses: [
                'Pilots probably love it.',
                'A plane, flying on a death mission...',
                'Incorrect.',
                'You\'re going down in flames.',
                'You\'re dead.'
            ]
        },
        {
            letter: 'l',
            name: 'Lotus Blossom',
            altAnswers: [],
            image: 'drink-l.png',
            recipe: {
                heading: 'drink-l-recipe-1.png',
                body: 'drink-l-recipe-2.png'
            },
            responses: [
                'Even we didn\'t know this one.',
                'Does Mayim Bialik help?',
                'Lotus Blossom. The answer is Lotus Blossom.',
                'There aren\'t many "L" cocktails.'
            ]
        },
        {
            letter: 'm',
            name: 'Moscow Mule',
            altAnswers: [
                'moskow mule',
                'moscowmule'
            ],
            image: 'drink-m.png',
            recipe: {
                heading: 'drink-m-recipe-1.png',
                body: 'drink-m-recipe-2.png'
            },
            responses: [
                'In Russia, this drinks you.',
                'Not a St. Petersburg Donkey, but close.',
                'First word: Moscow.',
                'American Jackass.'
            ]
        },
        {
            letter: 'n',
            name: 'Naked Lady',
            altAnswers: [
                'cosmo'
            ],
            image: 'drink-n.png',
            recipe: {
                heading: 'drink-n-recipe-1.png',
                body: 'drink-n-recipe-2.png'
            },
            responses: [
                'Not a Clothed Gentleman.',
                'That lady sure is naked.',
                'Wrong again.',
                'Let me make you a Shirley Temple.'
            ]
        },
        {
            letter: 'o',
            name: 'Old Fashioned',
            altAnswers: [
                'old-fashioned',
                'oldfashioned',
                'old fashion',
                'oldfashion'
            ],
            image: 'drink-o.png',
            recipe: {
                heading: 'drink-o-recipe-1.png',
                body: 'drink-o-recipe-2.png'
            },
            responses: [
                'Not new. Not modern.',
                'You, if you thought this game should be Flash-based.',
                'Bitters! You must know this.',
                'The hipsters love it.'
            ]
        },
        {
            letter: 'p',
            name: 'Pink Panther',
            altAnswers: [],
            image: 'drink-p.png',
            recipe: {
                heading: 'drink-p-recipe-1.png',
                body: 'drink-p-recipe-2.png'
            },
            responses: [
                'AKA Inspector Jacques Clouseau',
                'Oh, born after 1970, huh?',
                'It\'s a cartoon panther.'
            ]
        },
        {
            letter: 'q',
            name: 'Queen Bee',
            altAnswers: [
                'queen b',
                'queenbee',
                'queen be'
            ],
            image: 'drink-q.png',
            recipe: {
                heading: 'drink-q-recipe-1.png',
                body: 'drink-q-recipe-2.png'
            },
            responses: [
                'Think Beyonce.', 
                'Not the King...',
                'Pun Hint: It can get you buzzed.'
            ]
        },
        {
            letter: 'r',
            name: 'Rattlesnake',
            altAnswers: [
                'rattle snake'
            ],
            image: 'drink-r.png',
            recipe: {
                heading: 'drink-r-recipe-1.png',
                body: 'drink-r-recipe-2.png'
            },
            responses: [
                'It\'s coiled up and ready to strike the sober.',
                'The secret ingredient is venom.',
                'Not a Cobra or Python...'
            ]
        },
        {
            letter: 's',
            name: 'Skeleton Key',
            altAnswers: [],
            image: 'drink-s.png',
            recipe: {
                heading: 'drink-s-recipe-1.png',
                body: 'drink-s-recipe-2.png'
            },
            responses: [
                'It\'s a kind of key.',
                'In the shape of a skull...',
                'Nope.',
                'A Seabreeze was too hard to draw.'
            ]
        },
        {
            letter: 't',
            name: 'Tornado',
            altAnswers: [],
            image: 'drink-t.png',
            recipe: {
                heading: 'drink-t-recipe-1.png',
                body: 'drink-t-recipe-2.png'
            },
            responses: [
                'A Sharknado, minus the Sharks.',
                'Wrong.',
                'No!',
                'No! We already did Hurricane.'
            ]
        },
        {
            letter: 'u',
            name: 'UFO',
            altAnswers: [
                'unidentified flying object',
                'u.f.o.'
            ],
            image: 'drink-u.png',
            recipe: {
                heading: 'drink-u-recipe-1.png',
                body: 'drink-u-recipe-2.png'
            },
            responses: [
                'Pun Clue: It\'s out of this world.',
                'Alien spacecraft, for short.',
                'We can\'t help stupid. Sorry.'
            ]
        },
        {
            letter: 'v',
            name: 'Volcano',
            altAnswers: [],
            image: 'drink-v.png',
            recipe: {
                heading: 'drink-v-recipe-1.png',
                body: 'drink-v-recipe-2.png'
            },
            responses: [
                'Also a movie starring Tommy Lee Jones and Anne Heche. Seriously.',
                'Mount St. Helens.',
                'Oh, not a geography expert, we see.'
            ]
        },
        {
            letter: 'w',
            name: 'White Horse',
            altAnswers: [
                'whitehorse'
            ],
            image: 'drink-w.png',
            recipe: {
                heading: 'drink-w-recipe-1.png',
                body: 'drink-w-recipe-2.png'
            },
            responses: [
                'Not a Black Stallion.',
                'Huh, we thought that was a good clue.',
                'Caballo Blanco if you speak Spanish.'
            ]
        },
        {
            letter: 'x',
            name: 'Racer-X',
            altAnswers: [
                'racer x',
                'racerx'
            ],
            image: 'drink-x.png',
            recipe: {
                heading: 'drink-x-recipe-1.png',
                body: 'drink-x-recipe-2.png'
            },
            responses: [
                'This one is so hard we\'ll just give it to you: Racer-X.',
                'We. Just. Told. You.',
                'Fat typing fingers, huh?',
                'Come on Chim Chim, type faster.'
            ]
        },
        {
            letter: 'y',
            name: 'Yellow Submarine',
            altAnswers: [],
            image: 'drink-y.png',
            recipe: {
                heading: 'drink-y-recipe-1.png',
                body: 'drink-y-recipe-2.png'
            },
            responses: [
                'We all live in one.',
                'Nope.',
                'Wrong again.',
                'You must be a Wings fan.'
            ]
        },
        {
            letter: 'z',
            name: 'Zombie',
            altAnswers: [
                'zombe',
                'zomby'
            ],
            image: 'drink-z.png',
            recipe: {
                heading: 'drink-z-recipe-1.png',
                body: 'drink-z-recipe-2.png'
            },
            responses: [
                'Pairs great with The Walking Dead.',
                'Really? Z and Walking Dead?',
                'This quiz is over.'
            ]
        }
    ]
};
