export const explorePopREpos = async (req, res) => {

    const {language}=req.params


    try {


        const responsse = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10
`, {
            headers: {
                Authorization: `token  ${process.env.GITHUB_API_TOKEN}`,
            },
        });
        if (!responsse.ok) {
            throw new Error(`GitHub API Error: ${responsse.status}`);
        }

        const responseData = await responsse.json();

        res.status(200).json({
            success:true,
            repos:responseData.items,
            message:"Data fetched Successfully!"
        })

    } catch (error) {
        console.log("Error in getting the explore repos", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};