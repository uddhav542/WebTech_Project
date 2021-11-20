const mongo=require("mongoose");

const Books=mongo.model('books');

exports.baseRoute= async(req,res)=>{
    res.send('Server Running');
}

exports.getbooks= async(req,res)=>{
        const book=await Books.find();
        res.json(book);
    }
exports.addbook= async(req,res)=>{
   let book=({
	   title:req.body.title,
	   author:req.body.author,
	   desc:req.body.desc,
   });
    await new Books(book).save((err,data)=>{
        if(err){
            res.status(500).json({
                message:"Something went wrong,please try again later.",
            });
        }
        else{
			 res.send(data);
            /*res.status(200).json({
                message:"Book is inserted",
               
            });*/
        }
    });
}
exports.getsinglebook=async(req,res)=>{
    let book_id=req.params.source;
	  let book_id1=req.params.destination;
    await Books.findById({_source:book_id},(err,data)=>{
        if(err){
            res.status(500).json({
                message:"error",
            });

        }else{
            console.log(data);
            res.status(200).json({
                message:"book found",
                data
            });
        }
    });
}
exports.updateBook = async (req, res) => {
    // get a postID.
    let book_ID = req.params.id;
  
    // we will use findByIdAndUpdate function : findByIdAndUpdate(id, data, callback)
    await Books.findByIdAndUpdate({_id: book_ID}, {$set : req.body}, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "book Updated",
          data,
        });
      }
    });
  }
  
  // function to delete a post from the DB
  exports.deleteBook = async (req, res) => {
    let book_id = req.params.id;
    // we use mongodb's deleteOne() functionality here
    await Books.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "book Deleted"
        });
      }
    });
  };