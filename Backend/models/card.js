const mongoose = require('mongoose');

let dbEndPoint = '';
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    dbEndPoint = String(process.env.DB_END_POINT);
} else {
    dbEndPoint = 'mongodb://127.0.0.1:27017/OSFCardSort';  // mongo shell for development
}

mongoose.connect(dbEndPoint);

const cardSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Card', cardSchema);


// const Card = mongoose.model('Card', cardSchema);;

// const newCard = new Card({
//     data: {
//         'Physical Health': {
//             label: 'Physical health',
//             preview: 'Access to physical health services, health insurance, and the priority of your physical health and wellbeing, such as how often you engage in physical activity.',
//             imageUrl: 'physical-health',
//             content: `<ol><li>How does your physical health impact your daily life in the past?</li>
//             <li>Where do you get dependable health advice?</li>
//             <li>Do you have to go far for healthcare?</li>
//             <li>Do you have health insurance? Does it cover your needs?</li>
//             <li>Do you have a provider?</li></ol>`
//         },
//         'Friends and Support': {
//             label: 'Friends and Support',
//             preview: 'Importance of friends in your daily life.',
//             imageUrl: 'friends',
//             content: `<ol><li>Who is your support system?</li>
//             <li>How would you describe your friends?</li>
//             <li>In what ways do your friends and support show up for you?</li>
//             <li>How important are your friends in your life?</li>
//             <li>Are you able to spend quality time with your friends?</li>
//             <li>What roles do your friends play in your life?</li></ol>`
//         },
//         'Food': {
//             label: 'Food',
//             preview: 'Access to nutritious food that sustains you.',
//             imageUrl: 'food',
//             content: `<ol><li>What does your access to food look like?</li>
//             <li>Are there any barriers to accessing food? If so, what are they?</li>
//             <li>Is access to food ever an issue for you?</li>
//             <li>Do you frequently wonder where next meals will come from?</li>
//             <li>How do you usually access your food?</li></ol>`
//         },
//         'Home': {
//             label: 'Home',
//             preview: 'Importance of your home, whether that is the place you live or where you feel most comfortable.',
//             imageUrl: 'home',
//             content: `<ol><li>What does home mean to you?</li>
//             <li>If home is a physical place, where is it and what does it look like?</li>
//             <li>How do you feel when you are at home?</li>
//             <li>What role does your home play in your daily life?</li>
//             <li>What makes a home?</li></ol>`
//         },
//         'Mental health and Self Care': {
//             label: 'Mental health and Self Care',
//             preview: 'Access to mental health services, health insurance, and the priority of your mental and emotional wellbeing.',
//             imageUrl: 'mental-health',
//             content: `<ol><li>How does your mental health impact your daily life?</li>
//             <li>How has your mental health been in the past?</li>
//             <li>Have you ever been worried about your mental health? Why?</li>
//             <li>Does self-care impact your mental and physical health? Why or why not?</li>
//             <li>Describe the ways in which you care for yourself. What works best for you?</li></ol>`
//         },
//         'Money': {
//             label: 'Money',
//             preview: 'Any money earned from work or otherwise.',
//             imageUrl: 'money',
//             content: `<ol><li>How would you describe your access to money?</li>
//             <li>What role does money play in your daily life?</li>
//             <li>Do you have enough to cover utilities, housing, medicines, phone and data?</li>
//             <li>Where does your income come from?</li>
//             <li>How secure do you feel about your income?</li></ol>`
//         },
//         'Employment': {
//             label: 'Employment',
//             preview: 'Having a job, having job security, how you feel about the work you are doing.',
//             imageUrl: 'employment',
//             content: `<ol><li>How do you feel about your current employment?</li>
//             <li>Do you feel secure in your job or position? Why or why not?</li>
//             <li>Is your work risky or hazardous?</li>
//             <li>Do you travel far for work?</li>
//             <li>What do you like or dislike about your current job or position?</li></ol>`
//         },
//         'Family': {
//             label: 'Family',
//             preview: 'Importance of family in your daily life, whether biological or chosen.',
//             imageUrl: 'family',
//             content: `<ol><li>What role does your family play in your daily life?</li>
//             <li>How do you feel about your family?</li>
//             <li>Are you close to your family? Why or why not?</li>
//             <li>What does family mean to you?</li>
//             <li>How supported or unsupported do you feel by your family?</li></ol>`
//         },
//         'Transportation': {
//             label: 'Transportation',
//             preview: 'The ability to take care of oneself, physically, mentally, and emotionally, including activities or actions taken to care for oneself.',
//             imageUrl: 'transportation',
//             content: `<ol><li>How would you describe your access to transportation?</li>
//             <li>What role does transportation play in your daily life?</li>
//             <li>Do you have enough to cover transportation costs including upkeep?</li>
//             <li>Do you often travel more than 20 min for your needs?</li>
//             <li>How secure do you feel about your transportation?</li></ol>`
//         },
//     }
// });
// newCard.save();
