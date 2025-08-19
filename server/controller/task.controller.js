export const homePage = async(req,res) => {
    try {
        res.status(200).json({msg : 'You are at home page', data : req.user});
    } catch (error) {
        console.log('Error',error.message)
    }
}