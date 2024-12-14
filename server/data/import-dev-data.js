const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {
  HtmlQuiz,
  CssQuiz,
  JavascriptQuiz,
  ReactQuiz,
  NodejsQuiz,
  JavaQuiz,
  PythonQuiz,
  PhpQuiz,
  SqlQuiz,
  LinuxQuiz,
  AiQuiz,
  SeoQuiz,
} = require('./../models/quizModel');

const model = [
  HtmlQuiz,
  CssQuiz,
  JavascriptQuiz,
  ReactQuiz,
  NodejsQuiz,
  JavaQuiz,
  PythonQuiz,
  PhpQuiz,
  SqlQuiz,
  LinuxQuiz,
  AiQuiz,
  SeoQuiz,
];

const quiz = [
  'htmlQuestions',
  'cssQuestions',
  'javascriptQuestions',
  'reactjsQuestions',
  'nodejsQuestions',
  'javaQuestions',
  'pythonQuestions',
  'phpQuestions',
  'sqlQuestions',
  'linuxQuestions',
  'aiQuestions',
  'seoQuestions',
];

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'));

const impmultiple = async () => {
  for (let i = 0; i < model.length; i++) {
    try {
      const questions = JSON.parse(
        fs.readFileSync(`${__dirname}/${quiz[i]}.json`, 'utf-8')
      );
      await model[i].create(questions);
      console.log('Data Added successfully!');
    } catch (err) {
      console.log(err);
    }
  }
  process.exit();
};

const delmultiple = async () => {
  for (let i = 0; i < model.length; i++) {
    try {
      await model[i].deleteMany();
      console.log('Data deleted successfully!');
    } catch (err) {
      console.log(err);
    }
  }
  process.exit();
};

if (process.argv[2] === '--impmul') impmultiple();
if (process.argv[2] === '--delmul') delmultiple();

// const questions = JSON.parse(
//   fs.readFileSync(`${__dirname}/${process.argv[2]}.json`, 'utf-8')
// );

// for (let i = 0; i < model.length; i++) {
//   console.log(
//     quiz[i],
//     JSON.parse(fs.readFileSync(`${__dirname}/${quiz[i]}.json`, 'utf-8')).length
//   );
// }

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await model[process.argv[3]].create(questions);
    console.log('Data Added successfully!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

//DELETE ALL DATA FROM COLLECTION
const deleteDAta = async () => {
  try {
    await model[process.argv[3]].deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

// 2nd index is filename
// 3rd index is model
// 4thd index is condition

if (process.argv[4] === '--import') importData();
if (process.argv[4] === '--delete') deleteDAta();
