const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OSFCardSort');

const cardSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Card', cardSchema);


// const Card = mongoose.model('Card', cardSchema);;

// const newCard = new Card({
//     data: {
//         'Physical health': {
//             label: 'Physical health',
//             preview: 'Access to physical health services, health insurance, and the priority of your physical health and wellbeing, such as how often you engage in physical activity.',
//             imageUrl: 'home',
//             content: `<ol><li>Do you feel physically healthy?</li>
//             <li>How has your physical health been in the past?</li>
//             <li>Is there anything about your physical health that needs to be addressed?</li>
//             <li>How does your physical health impact your daily life?</li>
//             <li>Have you ever been worried about your physical health? Why?</li></ol>`
//         },
//         'Friends': {
//             label: 'Friends',
//             preview: 'Importance of friends in your daily life.',
//             imageUrl: 'envelope-solid',
//             content: `<ol><li>How would you describe your friends?</li>
//             <li>In what ways do your friends show up for you?</li>
//             <li>How important are your friends in your life?</li>
//             <li>Are you able to spend quality time with your friends?</li>
//             <li>What roles do your friends play in your life?</li></ol>`
//         },
//         'Support system': {
//             label: 'Support system',
//             preview: 'Importance of those around you who support you. This could be friends, family, or anyone else who supports you in any way.',
//             imageUrl: 'gear-solid',
//             content: `<ol><li>Who is your support system?</li>
//             <li>In what ways does your support system show up for you?</li>
//             <li>What does ideal support look like for you?</li>
//             <li>What are some actions that your support system takes to uplift you?</li>
//             <li>How important is your support system in your life?</li></ol>`
//         },
//         'Food': {
//             label: 'Food',
//             preview: 'Access to nutritious food that sustains you.',
//             imageUrl: 'shield-solid',
//             content: `<ol><li>What does your access to food look like?</li>
//             <li>Are there any barriers to accessing food? If so, what are they?</li>
//             <li>Is access to food ever an issue for you?</li>
//             <li>How does food make you feel?</li>
//             <li>How do you usually access your food?</li></ol>`
//         },
//         'Home': {
//             label: 'Home',
//             preview: 'Importance of your home, whether that is the place you live or where you feel most comfortable.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>What does home mean to you?</li>
//             <li>If home is a physical place, where is it and what does it look like?</li>
//             <li>How do you feel when you are at home?</li>
//             <li>What role does your home play in your daily life?</li>
//             <li>What makes a home?</li></ol>`
//         },
//         'Mental health': {
//             label: 'Mental health',
//             preview: 'Access to mental health services, health insurance, and the priority of your mental and emotional wellbeing.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>Do you feel mentally healthy?</li>
//             <li>How does your mental health impact your daily life?</li>
//             <li>How has your mental health been in the past?</li>
//             <li>Is there anything about your mental health that needs to be addressed?</li>
//             <li>Have you ever been worried about your mental health? Why?</li></ol>`
//         },
//         'Money': {
//             label: 'Money',
//             preview: 'Any money earned from work or otherwise.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>How would you describe your access to money?</li>
//             <li>What role does money play in your daily life?</li>
//             <li>How important is money to you?</li>
//             <li>Where does your income come from?</li>
//             <li>How secure do you feel about your income?</li></ol>`
//         },
//         'Employment': {
//             label: 'Employment',
//             preview: 'Having a job, having job security, how you feel about the work you are doing.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>How do you feel about your current employment?</li>
//             <li>Do you feel secure in your job or position? Why or why not?</li>
//             <li>How do you feel about your current job?</li>
//             <li>Have you thought about looking for different jobs? If so, why?</li>
//             <li>What do you like or dislike about your current job or position?</li></ol>`
//         },
//         'Family': {
//             label: 'Family',
//             preview: 'Importance of family in your daily life, whether biological or chosen.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>What role does your family play in your daily life?</li>
//             <li>How do you feel about your family?</li>
//             <li>Are you close to your family? Why or why not?</li>
//             <li>What does family mean to you?</li>
//             <li>How supported or unsupported do you feel by your family?</li></ol>`
//         },
//         'Self-care': {
//             label: 'Self-care',
//             preview: 'The ability to take care of oneself, physically, mentally, and emotionally, including activities or actions taken to care for oneself.',
//             imageUrl: 'filter-solid',
//             content: `<ol><li>In which ways do you practice self-care?</li>
//             <li>Is self-care a priority to you? Why or why not?</li>
//             <li>Describe the ways in which you care for yourself.</li>
//             <li>Does self-care impact your mental and physical health? Why or why not?</li>
//             <li>What is the most impactful mode of self-care that you participate in?</li></ol>`
//         },
//     }
// });
// newCard.save();
