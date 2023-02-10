declare function createQRCode(id: string, config: any): any;

export interface QRCodeConfig {
    content: string,
	width: number,
	height: number,
	colorDark?: string,
	colorLight?: string,
}

export class QRCoder {

    public static generate(id: string, config: QRCodeConfig) {
        return createQRCode(id, {
            text: config.content,
            width: config.width,
            height: config.height,
            colorDark: config.colorDark ?? '#5868bf',
            colorLight: config.colorLight ?? '#f1f5ff'
        });
    }
}