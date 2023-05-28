
let posts = [];
const PostSchema = new mongoose.Schema(
  {
    title:String,
    content:String
  }
);

const Post = mongoose.model("Post",PostSchema);

const default1 = new Post({
  title:"Day1",
  content:"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
})

const default2 = new Post({
  title:"Day2",
  content:"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
})

app.get("/", function(req, res){
  Post.find({},(err,defaultItems)=>
  {
    if(!err)
    {
      if(defaultItems.length === 0)
      {
        default1.save();
        default2.save();
        res.redirect("/");
      }
      else
      {
        res.render("home", {
          startingContent: homeStartingContent,
          posts: defaultItems });
      }
    }   
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){ 
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  newPost.save();
  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = req.params.postName;

   // Searching for the requested post and redirecting to that post page4
    //Iterating over posts array and finding
  
    Post.findOne({title:requestedTitle},(err,requestedPost)=>
    {
      if(!err)
      {
        res.render("post",{
          title:requestedPost.title,
          content:requestedPost.content
        })
      }
    })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
