let communityController = module.exports;
const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");

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