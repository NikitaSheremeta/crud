import { Router } from 'express';
import Appliance, { IAppliance } from '../models/appliance';

const CREATED = 201;
const ITERNAL_SERVER_ERROR = 500;

const router: Router = Router();

router.get('/', async (req, res): Promise<void> => {
  try {

    const appliances: IAppliance[] = await Appliance.find();

    res.json(appliances);

  } catch (err) {
    res.status(ITERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Try again later.'
    });
  }
});

router.post('/add', async (req, res): Promise<void> => {
  try {

    type DataProps = Record<
      'title'
    | 'description'
    | 'category'
    | 'vendorCode', string>;

    const data: DataProps = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      vendorCode: req.body.vendorCode,
    };

    const appliance: IAppliance = new Appliance(data);

    await appliance.save();

    res.status(CREATED).json({ appliance });

  } catch (err) {
    res.status(ITERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Try again later.'
    });
  }
});

router.get('/:id', async (req, res): Promise<void> => {
  try {

    const appliance: IAppliance = await Appliance.findById(req.params.id);

    res.json(appliance);

  } catch (err) {
    res.status(ITERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Try again later.'
    });
  }
});

router.delete('/:id', async (req, res): Promise<void> => {
  try {

    await Appliance.findByIdAndDelete(req.params.id);

    res.json({ message: 'Appliance deleted' });

  } catch (err) {
    res.status(ITERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Try again later.'
    });
  }
});

router.post('/update/:id', async (req, res): Promise<void> => {
  try {

    const appliance: IAppliance = await Appliance.findById(req.params.id);

    appliance.title = req.body.title;
    appliance.description = req.body.description;
    appliance.category = req.body.category;
    appliance.vendorCode = req.body.vendorCode;

    await appliance.save();

    res.json({ message: 'Appliance updated!' });

  } catch (err) {
    res.status(ITERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Try again later.'
    });
  }
});

export default router;
