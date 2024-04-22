let communityController = module.exports;
const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");
const { query } = require("express");


communityController.imageInsertion = async ( res, req ) => {
    try {
        console.log(`POST: cont/imageInsertion`);
        assert.ok(req.file, Definer.general_err3);
        const image_url = req.file.path.replace(/\\/g, "/");

        res.json({ state: "success", data: image_url });

    }catch(err) {
        console.log(`ERROR, cont/imageInsertion, ${err.message}`);
        res.json({ state: "fail", message: err.message });

    }
};

communityController.createArticle = async (req, res) => {
    try {
        console.log(`POST: cont/createArticle`);
        //assert.ok(req.file, Definer.general_err3);

        // community service model
        const community = new Community();
        const result = await community.createArticleData(req.member, req.body);
        assert.ok(result, Definer.general_err1);
        res.json({ state: "success", data: result });
    }catch(err) {
        console.log(`ERROR, cont/createArticle, ${err.message}`);
        res.json({ state: "fail", message: err.message });

    }
};

communityController.getMemberArticles = async (req, res) => {
    try {
        console.log("GET: cont/getMemberArticles");
        const community = new Community();
    
        const mb_id = req.query.mb_id !== "none" ? req.query.mb_id : req.member?._id;
        assert.ok(mb_id, Definer.article_err1);
    
        console.log("mb_id:::", mb_id);
             console.log("QUERY:::", req.query.mb_id);
    
             const result = await community.getMemberArticlesData(
                req.member, 
                mb_id, 
                req.query
                );
                res.json({state: 'success', data: result});


}catch(err) {
    console.log(`ERROR: cont/getMemberArticles, ${err.message}`); 
        res.json({state: 'fail', message: err.message});

}
};


communityController.getArticles = async (req, res) => {
    try {
    console.log("GET: cont/getArticles");
    console.log("query::", query);
    const community = new Community();
    const result = await community.getArticlesData(req.member, req.query);
    console.log("req.member::",req.member);
    console.log("req.quiry::",req.query);
    console.log("result:::",result);
    res.json({state: 'success', data: result });
    }catch(err) {
     console.log(`ERROR: cont/getArticles, ${err.message}`); 
     res.json({state: 'fail', message: err.message});

    }
};

communityController.getChosenArticle = async (req, res) => {
    try{
        console.log("GET: cont/getChosenArticle");

        const art_id = req.params.art_id;
        // console.log("ART_ID:::", art_id);
        // console.log("req.PARAMS:::",  req.params);

        const community = new Community();
        const result = await community.getChosenArticleData(req.member, art_id);

        res.json({state: 'success', data: result});
    } catch(err) {
        console.log(`ERROR: cont/getChosenArticle, ${err.message}`); 
     res.json({state: 'fail', message: err.message});

    }
}