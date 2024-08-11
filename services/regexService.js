
class RegexService {
    OnuAndSN = (text) => {
        return new Promise((resolve, reject) => {
            try {

                const resultSN = this.#prefix({ data: text, prefixType: "serialnumber" })
                const resultOnu = this.#prefix({ data: text, prefixType: "onu" })

                if (!resultSN || !resultOnu) {
                    reject(new Error('No matching data found.'));
                    return;
                }
                let dataOlt = []

                for (let i = 0; i < Math.min(resultOnu.length, resultSN.length); i++) {
                    dataOlt.push({
                        id: i + 1,
                        onu: resultOnu[i],
                        serialNumber: resultSN[i]
                    });
                }
                resolve(dataOlt);
            } catch (error) {
                reject(error);
            };
        })
    }

    prefixSN = (text) => {
        return new Promise((resolve, reject) => {
            try {
                const sn = this.#prefix({ data: text, prefixType: "serialnumber" })

                if (!sn) {
                    reject(new Error('No matching data found.'));
                    return;
                }

                let dataOlt = []

                for (let i = 0; i < sn.length; i++) {
                    dataOlt.push({
                        serialNumber: sn[i]
                    });
                }
                resolve(dataOlt);
            } catch (error) {
                reject(error);
            }
        })
    }

    RedamanRxTX = (text) => {
        return new Promise((resolve, reject) => {
            try {
                const rxUp = this.#prefix({ data: text, prefixType: "uprx" });
                const txUp = this.#prefix({ data: text, prefixType: "uptx" });

                const rxDown = this.#prefix({ data: text, prefixType: "downrx" });
                const txDown = this.#prefix({ data: text, prefixType: "downtx" });

                if (!rxUp || !rxDown || !txUp || !txDown) {
                    reject(new Error('No matching data found.'));
                    return;
                };

                const dataOlt = {
                    onu: {
                        rx: rxUp.toString(),
                        tx: txUp.toString()
                    },
                    ont: {
                        rx: rxDown.toString(),
                        tx: txDown.toString()
                    },
                };

                resolve(dataOlt);
            } catch (error) {
                reject(error);
            }
        })
    }

    #prefix = ({ data, prefixType }) => {
        switch (prefixType) {
            case "serialnumber":
                return data.match(/ZTE\w+/g);
            case "onu":
                return data.match(/(?<=\W+onu.)\d+/gi);
            case "replaceup":
                return data.replace(/up/g, "onu");
            case "replacedown":
                return data.replace(/down/g, "ont");
            case "uprx":
                return data.match(/(?<=(\W+)?up\W+Rx\W+)[-]?\d+(.\d+)?/g);
            case "uptx":
                return data.match(/(?<=(\W+)?up\W+Rx\W+\d+\.?\d+[()a-z]*\W+Tx\W+)[-]?\d+(.\d+)?/g);
            case "downrx":
                return data.match(/(?<=(\W+)?down\s+Tx\s+\W)[-]?\d+(.\d+)?/g);
            case "downtx":
                return data.match(/(?<=(\W+)?down\s+Tx\s+\W[-]?\d+(.\d+)?[()a-z]+\s+Rx\W+)[-]?\d+(.\d+)?/g);
            default:
                break;
        }
        ""
    }
}

export default new RegexService();