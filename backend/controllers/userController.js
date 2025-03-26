import UserModel from "../models/userModel.js";

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


export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await UserModel.findById(req.user._id.toString());
		console.log(user, "auth user");
		const userToLike = await UserModel.findOne({ username });

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" });
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked!" });
		}

		userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
		user.likedProfiles.push(userToLike.username);

		// await userToLike.save();
		// await user.save();  //this is slow
		await Promise.all([userToLike.save(), user.save()]);

		res.status(200).json({ message: "User liked the profile!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getLikes = async (req, res) => {
	try {
		const user = await UserModel.findById(req.user._id.toString());
		res.status(200).json({ likedBy: user.likedBy });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};