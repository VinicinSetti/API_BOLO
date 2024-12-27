import handlebars from "handlebars";
import fs from 'fs';

interface ITemplateVariable{
    [key: string]: string | number;
}

interface IParceMailTemplate{
    file: string;
    variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
    public async parse({file, variables}: IParceMailTemplate): Promise<string>{
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        });
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}