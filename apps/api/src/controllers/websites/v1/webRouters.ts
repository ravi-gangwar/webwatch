import prismaClient from 'db';
import { Request, Response, Router } from 'express';

// Extend the Request type to include user
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

    if (existingWebsite) {
        return res.status(400).json({ message: 'Website already exists' });
    }

    const newWebsite = await prismaClient.websites.create({
        data: {
            name,
            url: modifiedUrl,
            userId: userId,
        }
    })

    res.json({ message: 'Website added successfully', website: newWebsite });
})


export default webRouter;