import prismaClient from 'db';
import { Request, Response, Router } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const webRouter = Router();

webRouter.post('/add-website', async (req: AuthenticatedRequest, res: Response): Promise<any> => {

    const { name, url } = req.body;

    const userId = req?.user?.id;
    
    const modifiedUrl = url.replace(/^https?:\/\//, '');

    if (!name || !url) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingWebsite = await prismaClient.websites.findFirst({
        where: {
            url: modifiedUrl,
        }
    })

    if (existingWebsite) return res.status(400).json({ message: 'Website already exists' });

    const newWebsite = await prismaClient.websites.create({
        data: {
            name,
            url: modifiedUrl,
            userId: userId,
        }
    })

    res.json({ message: 'Website added successfully', website: newWebsite });
})

// first get all websites for the user
// then get all ticks for the websites
// then return the ticks

webRouter.get('/get-websites-ticks', async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    console.log("get-websites-ticks");
    const userId = req?.user?.id;
    const websites = await prismaClient.websites.findMany({ where: { userId }, include: { ticks: true } });
    res.json({ websites: websites.map(website => ({ ...website, ticks: website.ticks.map(tick => ({ ...tick, website: undefined })) })) });
})


export default webRouter;