
exports.error = (req, res) => {
    res.status(404).json({
        message: "Either the path specified is not available or some internal server error occured! Please visit / for endpoints"
    })
};