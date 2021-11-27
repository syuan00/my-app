/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.issues.remove({});

const issuesDB = [
    {
      user_id:"111634259262178726353",
      type: "page", id: 2, title: 'How to Take Care of a Cat', 
      link: 'https://www.wikihow.com/Take-Care-of-a-Cat', 
      summary: "This article was co-authored by Molly DeVoss. Molly DeVoss is a Certified Feline Training and Behavior \
      Specialist (CFTBS), a Certified Cat Behavior Consultant (CCBC), a Fear Free Certified Trainer (FFCT), and the \
      Founder of Cat Behavior Solutions. Molly specializes in using positive reinforcement to modify and",
      summaryImage: "https://www.wikihow.com/Take-Care-of-a-Cat#/Image:Take-Care-of-a-Cat-Step-6-Version-3.jpg",
      createdTime: new Date('2021-09-04'),
      category: "home",
      foler: null,
      tags: null,
      text: "<p>With their playful personalities, affectionate behavior, and adorable faces, cats can be the ideal pet. But, despite popular opinion, cats are not maintenance-free! To keep your cat healthy and happy, you need to know how to take care of and provide the best possible life for your new furry friend.</p>\
      <p>1</p>\
      <p>Encourage the cat to use a litter box.[1] Most cats will prefer the litter box to other parts of the house because of the texture of the litter.[2] But, there are still steps you need to take to make sure you're offering the litter box as the best place to use the bathroom.</p>\
      <p>Place the box in a quiet spot where the cat won’t be bothered by people, dogs, or loud noises.</p>\
      <p>To keep the litter box clean, make sure you scoop the litter daily, and clean the box weekly. You should also replace or refresh the litter at least once a week.[3]</p>\
      <p>Provide enough litter boxes for more than one cat. If you have 2 cats, you need 3 litter boxes in different areas of the home. One cat might try to intimidate a less dominate cat away from using a single box.</p>\
      <p>2</p>\
      <p>Make the litter box a comfortable place. Don't frighten or startle your cat when it's using the box, or it may form a bad association with the box and start avoiding it. Buy a large box, even if you have to spend a little money on it. Cats are more comfortable in a larger (in area, not height) box.[4]</p>\
      <p>Don’t switch brands of litter on your cat, because cats don’t like sudden change. Switching from a clay litter to a scoopable clumping type of litter or vice versa might upset the cat so much it stops using the box.</p>\
      <p>Don’t use heavily scented litters that might deter a cat from litter box use.</p>\
      <p>3</p>\
      <p>Take young or old cats needs into consideration. Keep in mind that kittens and older cats with arthritis or other health problems may have problems getting in and out of a box that's too tall. Use low-height boxes in an easily accessible area for kittens and cats with special needs, or buy an adjustable litter box.[5]</p>\
      <p>4</p>\
      <p>Provide the cat with a scratching post. Scratching is a normal part of cat behavior, and there's no way you can train it out of them. If your cat still has its claws, he'll need one or two scratching posts to keep him from scratching up furniture, woodwork, and so on. By providing a post, you allow the cat to indulge in normal, healthy behavior.[6]</p>\
      <p>5</p>\
      <p>Discourage the cat from exploring forbidden surfaces. Cats are curious, and will jump on counters or other places you'd like them to steer clear of. Scat mats, a perfectly timed mist of water from a spray bottle, or even a stern “no” can correct this behavior.[7]XExpert Source</p>\
      <p>Molly DeVossMolly DeVoss</p>\
      <p>Certified Feline Training and Behavior Specialist & Certified Cat Behavior Consultant</p>\
      <p>Expert Interview. 28 June 2021.</p>\
      <p>With time and patience, you can teach your cat to stay away from your protected areas.</p>\
      <p>You can also use a rattle can (an empty soda can filled with a few pebbles and the opening taped over). Toss it gently on the ground to scare a cat away from forbidden surfaces. DO NOT throw the can at the cat, for that may harm your cat.</p>\
      <p>6</p>\
      <p>Consider using feline pheromone products. These products, which fill the air with calming synthetic pheromones, come as sprays or diffusers that plug into electrical outlets.[8] They can help resolve litter box or scratching issues, and have also been proven to calm stressed or anxious cats.</p>\
      ",
      snapshot: "https://tva1.sinaimg.cn/large/008i3skNly1gv5zpmrtvwj60u09kxkdb02.jpg",
      noteText: null,
      lastMotifiedTime: null,
    },
    {
      user_id:"111634259262178726353",
      type: "page", id: 1, title: 'Spicy Ahi Poke Salad', 
      link: 'https://www.allrecipes.com/recipe/256937/spicy-ahi-poke-salad/', 
      summary: "Explore Allrecipes Allrecipes Allrecipes Find a Recipe Explore The Foolproof Way to Cook Bacon in the Microwave \
      The Foolproof Way to Cook Bacon in the Microwave",
      summaryImage: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8159186.jpg&q=85",
      createdTime: new Date('2021-09-03'),
      category:"read",
      foler: "Recipes",
      tags: ["seafoods", "salad"],
      text: "<p>Ingredients</p>\
      <p>Original recipe yields 5 servings</p>\
      <p>Ingredient Checklist</p>\
      <p>1 pound ahi tuna, cut into 1/2-inch cubes</p>\
      <p>¼ cup minced green onion</p>\
      <p>2 tablespoons ground roasted macadamia nuts</p>\
      <p>2 tablespoons chopped fresh cilantro, or more to taste</p>\
      <p>1 tablespoon fresh lime juice</p>\
      <p>2 teaspoons sesame oil, or more to taste</p>\
      <p>1 teaspoon minced fresh ginger</p>\
      <p>1 teaspoon red pepper flakes</p>\
      <p>1 teaspoon sriracha sauce, or to taste</p>\
      <p>ADD ALL INGREDIENTS TO SHOPPING LIST </p>\
      <p>Step 1</p>\
      <p>Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; refrigerate for 2 hours.</p>\
      <p>Editor's Note:</p>\
      <p>Consuming raw seafood may increase your risk of food borne illness, especially if you have certain medical conditions.</p>\
      <p>Nutrition Facts</p>\
      <p>Per Serving: 144 calories; protein 21.7g; carbohydrates 1.6g; fat 5.5g; cholesterol 40.9mg; sodium 89.2mg. Full Nutrition</p>\
      ",
      snapshot: "https://tva1.sinaimg.cn/large/008i3skNgy1gv606b0i3nj60u03gt4b602.jpg",
      noteText: "\n\
      \n\
      Ingredient\n\
      1 pound ahi tuna, cut into 1/2-inch cubes\n\
      ¼ cup minced green onion\n\
      2 tablespoons ground roasted macadamia nuts\n\
      2 tablespoons chopped fresh cilantro, or more to taste\n\
      1 tablespoon fresh lime juice\n\
      2 teaspoons sesame oil, or more to taste\n\
      1 teaspoon minced fresh ginger\n\
      1 teaspoon red pepper flakes\n\
      1 teaspoon sriracha sauce, or to taste\n\
      \n\
      Steps\n\
      1. Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; \n\
      2. Refrigerate for 2 hours.\n\
      ",
      lastMotifiedTime: new Date('2021-09-03'),
    },
    {
      user_id:"116763752579496784797",
      type: "page", id: 4, title: 'How to Take Care of a Cat', 
      link: 'https://www.wikihow.com/Take-Care-of-a-Cat', 
      summary: "This article was co-authored by Molly DeVoss. Molly DeVoss is a Certified Feline Training and Behavior \
      Specialist (CFTBS), a Certified Cat Behavior Consultant (CCBC), a Fear Free Certified Trainer (FFCT), and the \
      Founder of Cat Behavior Solutions. Molly specializes in using positive reinforcement to modify and",
      summaryImage: "https://www.wikihow.com/Take-Care-of-a-Cat#/Image:Take-Care-of-a-Cat-Step-6-Version-3.jpg",
      createdTime: new Date('2021-09-04'),
      category: "home",
      foler: null,
      tags: null,
      text: "<p>With their playful personalities, affectionate behavior, and adorable faces, cats can be the ideal pet. But, despite popular opinion, cats are not maintenance-free! To keep your cat healthy and happy, you need to know how to take care of and provide the best possible life for your new furry friend.</p>\
      <p>1</p>\
      <p>Encourage the cat to use a litter box.[1] Most cats will prefer the litter box to other parts of the house because of the texture of the litter.[2] But, there are still steps you need to take to make sure you're offering the litter box as the best place to use the bathroom.</p>\
      <p>Place the box in a quiet spot where the cat won’t be bothered by people, dogs, or loud noises.</p>\
      <p>To keep the litter box clean, make sure you scoop the litter daily, and clean the box weekly. You should also replace or refresh the litter at least once a week.[3]</p>\
      <p>Provide enough litter boxes for more than one cat. If you have 2 cats, you need 3 litter boxes in different areas of the home. One cat might try to intimidate a less dominate cat away from using a single box.</p>\
      <p>2</p>\
      <p>Make the litter box a comfortable place. Don't frighten or startle your cat when it's using the box, or it may form a bad association with the box and start avoiding it. Buy a large box, even if you have to spend a little money on it. Cats are more comfortable in a larger (in area, not height) box.[4]</p>\
      <p>Don’t switch brands of litter on your cat, because cats don’t like sudden change. Switching from a clay litter to a scoopable clumping type of litter or vice versa might upset the cat so much it stops using the box.</p>\
      <p>Don’t use heavily scented litters that might deter a cat from litter box use.</p>\
      <p>3</p>\
      <p>Take young or old cats needs into consideration. Keep in mind that kittens and older cats with arthritis or other health problems may have problems getting in and out of a box that's too tall. Use low-height boxes in an easily accessible area for kittens and cats with special needs, or buy an adjustable litter box.[5]</p>\
      <p>4</p>\
      <p>Provide the cat with a scratching post. Scratching is a normal part of cat behavior, and there's no way you can train it out of them. If your cat still has its claws, he'll need one or two scratching posts to keep him from scratching up furniture, woodwork, and so on. By providing a post, you allow the cat to indulge in normal, healthy behavior.[6]</p>\
      <p>5</p>\
      <p>Discourage the cat from exploring forbidden surfaces. Cats are curious, and will jump on counters or other places you'd like them to steer clear of. Scat mats, a perfectly timed mist of water from a spray bottle, or even a stern “no” can correct this behavior.[7]XExpert Source</p>\
      <p>Molly DeVossMolly DeVoss</p>\
      <p>Certified Feline Training and Behavior Specialist & Certified Cat Behavior Consultant</p>\
      <p>Expert Interview. 28 June 2021.</p>\
      <p>With time and patience, you can teach your cat to stay away from your protected areas.</p>\
      <p>You can also use a rattle can (an empty soda can filled with a few pebbles and the opening taped over). Toss it gently on the ground to scare a cat away from forbidden surfaces. DO NOT throw the can at the cat, for that may harm your cat.</p>\
      <p>6</p>\
      <p>Consider using feline pheromone products. These products, which fill the air with calming synthetic pheromones, come as sprays or diffusers that plug into electrical outlets.[8] They can help resolve litter box or scratching issues, and have also been proven to calm stressed or anxious cats.</p>\
      ",
      snapshot: "https://tva1.sinaimg.cn/large/008i3skNly1gv5zpmrtvwj60u09kxkdb02.jpg",
      noteText: null,
      lastMotifiedTime: null,
    },
    {
      user_id:"116763752579496784797",
      type: "page", id: 3, title: 'Spicy Ahi Poke Salad', 
      link: 'https://www.allrecipes.com/recipe/256937/spicy-ahi-poke-salad/', 
      summary: "Explore Allrecipes Allrecipes Allrecipes Find a Recipe Explore The Foolproof Way to Cook Bacon in the Microwave \
      The Foolproof Way to Cook Bacon in the Microwave",
      summaryImage: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8159186.jpg&q=85",
      createdTime: new Date('2021-09-03'),
      category:"read",
      foler: "Recipes",
      tags: ["seafoods", "salad"],
      text: "<p>Ingredients</p>\
      <p>Original recipe yields 5 servings</p>\
      <p>Ingredient Checklist</p>\
      <p>1 pound ahi tuna, cut into 1/2-inch cubes</p>\
      <p>¼ cup minced green onion</p>\
      <p>2 tablespoons ground roasted macadamia nuts</p>\
      <p>2 tablespoons chopped fresh cilantro, or more to taste</p>\
      <p>1 tablespoon fresh lime juice</p>\
      <p>2 teaspoons sesame oil, or more to taste</p>\
      <p>1 teaspoon minced fresh ginger</p>\
      <p>1 teaspoon red pepper flakes</p>\
      <p>1 teaspoon sriracha sauce, or to taste</p>\
      <p>ADD ALL INGREDIENTS TO SHOPPING LIST </p>\
      <p>Step 1</p>\
      <p>Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; refrigerate for 2 hours.</p>\
      <p>Editor's Note:</p>\
      <p>Consuming raw seafood may increase your risk of food borne illness, especially if you have certain medical conditions.</p>\
      <p>Nutrition Facts</p>\
      <p>Per Serving: 144 calories; protein 21.7g; carbohydrates 1.6g; fat 5.5g; cholesterol 40.9mg; sodium 89.2mg. Full Nutrition</p>\
      ",
      snapshot: "https://tva1.sinaimg.cn/large/008i3skNgy1gv606b0i3nj60u03gt4b602.jpg",
      noteText: "\n\
      \n\
      Ingredient\n\
      1 pound ahi tuna, cut into 1/2-inch cubes\n\
      ¼ cup minced green onion\n\
      2 tablespoons ground roasted macadamia nuts\n\
      2 tablespoons chopped fresh cilantro, or more to taste\n\
      1 tablespoon fresh lime juice\n\
      2 teaspoons sesame oil, or more to taste\n\
      1 teaspoon minced fresh ginger\n\
      1 teaspoon red pepper flakes\n\
      1 teaspoon sriracha sauce, or to taste\n\
      \n\
      Steps\n\
      1. Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; \n\
      2. Refrigerate for 2 hours.\n\
      ",
      lastMotifiedTime: new Date('2021-09-03'),
    },
  ];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ type: 1 });
db.issues.createIndex({ title: 1 });
db.issues.createIndex({ link: 1 });
db.issues.createIndex({ summary: 1 });
db.issues.createIndex({ summaryImage: 1 });
db.issues.createIndex({ createdTime: 1 });
db.issues.createIndex({ category: 1 });
db.issues.createIndex({ foler: 1 });
db.issues.createIndex({ tags: 1 });
db.issues.createIndex({ text: 1 });
db.issues.createIndex({ snapshot: 1 });
db.issues.createIndex({ noteText: 1 });
db.issues.createIndex({ lastMotifiedTime: 1 });