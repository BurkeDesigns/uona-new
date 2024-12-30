const threshold = 0.6;

type RecapachaProps = {
    token: string
    action?: string
    ip?: string
}

export async function validateRecaptcha(props: RecapachaProps) : Promise<boolean> {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${props.token}&remoteip=${props.ip}`;
    let valid = false;
    await fetch(url, {method: 'post'})
        .then((response: { json: () => any; }) => response.json())
        .then((data: any)=> {
            valid = (data.success && data.score && data.action && data.score >= threshold && data.action === props.action);
            // valid = data;
        });
    return valid;
}