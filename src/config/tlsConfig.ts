import {readFileSync} from "node:fs";
import path from "path";

export type TlsConfigType = { key: Buffer, cert: Buffer };

const tlsConfig: TlsConfigType = {
    key: readFileSync(path.join(import.meta.dirname, '../../certs',"ecdsa.key")),
    cert: readFileSync(path.join(import.meta.dirname, '../../certs',"ecdsa.crt"))
};
export default tlsConfig;
