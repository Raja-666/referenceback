const adminschema=require('../adminModules/AdminSchema')
const bcrypt=require('bcrypt')


exports.adminpasswordchange = async (req, res) => {
    const {oldPassword,newPassword} = req.body.data
    const {id}=req.body
     const loginexists = await adminschema.findOne({_id:id})
     const adminpswdecrypt= await bcrypt.compare(oldPassword,loginexists.password)
     const newpassworddata=await bcrypt.compare(newPassword,loginexists.password)
     try {
        if (!adminpswdecrypt) {
           return res.status(401).json({ message: 'password mis-match' })
        }
        else if(newpassworddata){
            return res.status(401).json({ message: 'both old and new password same!' })
        }
        else{
            const encryptnewpassword=await bcrypt.hash(newPassword, 10)
            await adminschema.updateOne({_id:id},{
               $set:{password: encryptnewpassword}
            })
            return res.status(200).json({message:'Admin Password changed sucessfully!'});
        }            
       }
  
    catch (error) {
        console.error(error.message);
        res.status(500).send('network error');
    }

}



exports.handleOldpattern = async (req, res) => {
    // const { email, password, pattern } = req.body;
    console.log(req.body, "req");

    // const string1 = JSON.stringify(arr1);
    const pattern = JSON.stringify(req.body.oldPattern);

    try {

        const handleOldPassword = await adminschema.findOne({
            _id: req.body.adminId
        })

        if (pattern === handleOldPassword.pattern) {
            return res.status(200).json({ message: 'password valid successfully' })
        }

        else {
            return res.status(401).json({ message: ' invalid pattern' })
        }

    }
    catch (err) {
        console.log(err);
    }
}

exports.updatePattern = async (req, res) => {
    const { newPattern, adminId } = req.body;
    
    const pattern = JSON.stringify(newPattern);

    try {
        const exisistPattern = await adminschema.findOne({
            _id: adminId,
        });

        if (pattern === exisistPattern.pattern) {
            return res.status(409).json({ message: "Already exisistPattern " });
        }
        await adminschema.updateOne({ _id: adminId }, { $set: { pattern: pattern } });
        res.status(200).json({ message: "NewPattern Updated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
