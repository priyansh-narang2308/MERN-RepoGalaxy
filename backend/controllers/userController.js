export const getProfileAndRepos = async (req, res) => {
    const { username } = req.params;

    try {
        //fetching user profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_TOKEN}`
            }
        });

        if (!userResponse.ok) {
            throw new Error(`GitHub API Error: ${userResponse.statusText}`);
        }

        const userProfile = await userResponse.json();

        const repoResponse = await fetch(userProfile.repos_url, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_TOKEN}`
            }
        });

        if (!repoResponse.ok) {
            throw new Error(`GitHub API Error: ${repoResponse.statusText}`);
        }

        const repos = await repoResponse.json();

        res.status(200).json({
            success: true,
            userProfile,
            repos,
            message: "Data Fetched Successfully!"
        });

    } catch (error) {
        console.error("Error in fetching the profile and repos:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
