import regexService from "../services/regexService.js";

class HandlerController {

    async regexOnuSn(req, res) {
        try {
            const { text } = req.body
            const result = await regexService.OnuAndSN(text);
            return res.status(200).json({
                message: "Success procces data olt",
                data: result,
            })
        } catch (error) {
            console.error("Error processing data:", error);
            return res.status(500).json({
                message: "Fail process data",
                error: error.message || "Unknown error",
            });
        }
    }

    async regexSn(req, res) {
        try {
            const { text } = req.body
            const result = await regexService.prefixSN(text);
            return res.status(200).json({
                message: "Success procces data olt",
                data: result,
            })
        } catch (error) {
            console.error("Error processing data:", error);
            return res.status(500).json({
                message: "Fail process data",
                error: error.message || "Unknown error",
            });
        }
    }

    async RegexRedaman(req, res) {
        try {
            const { text } = req.body
            const result = await regexService.RedamanRxTX(text);
            return res.status(200).json({
                message: "Success procces data olt",
                data: result,
            })
        } catch (error) {
            console.error("Error processing data:", error);
            return res.status(500).json({
                message: "Fail process data",
                error: error.message || "Unknown error",
            });
        }
    }
}

export default new HandlerController();