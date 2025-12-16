export const getCurrentUser = async (req, res) => {
        try {
            const user = req.user //lay tu middleware

            return res.status(200).json({
                user
            })
        } catch (error) {
            console.log("Error while get current user")
            return res.status(500).json({message: "error while getting user"})
        }
    }