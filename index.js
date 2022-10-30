const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

const categories = require("./data/Categories.json");
const news = require("./data/news.json");

//create api
app.get("/", (req, res) => {
  res.send("News Api Running");
});
//create api for news category

app.get("/news-categories", (req, res) => {
  res.send(categories);
});
// if dont give any id then show all news
// create an api
app.get("/news", (req, res) => {
  res.send(news);
});

//one category have many news
// api for categories
app.get("/category/:id", (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id; //id ta thik moton pacchekina
  //check the id is avaiable or not
  if (id === "08") {
    res.send(news); //if match then show all news
  } else {
    //one category_news have many news  that why we use filter for result
    const category_news = news.filter((n) => n.category_id === id);
    res.send(category_news); //send only matches news
  }
});

//create api for news
app.get("/news/:id", (req, res) => {
  console.log(req.params); //get the object and here we get  id
  console.log(req.params.id); //get only the id not object

  const id = req.params.id;
  //find means only which is match
  const selectedNews = news.find((n) => n._id === id); //if selected id will find that will give the result
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log("Dragon news server running on port", port);
});
