import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import sendMailService from '../services/sendMailService';
import path from 'path';

class SendMailController {
  async execute(req: Request, res: Response){
    const { email, surveys_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const usersAlrearyExists = await usersRepository.findOne({email});

    if (!usersAlrearyExists) {
      return res.status(400).json({error: "User does not exist"});
    }

    const surveysAlrearyExists = await surveysRepository.findOne({id: surveys_id});

    if (!surveysAlrearyExists) {
      return res.status(400).json({error: "Survey does not exist"})
    }

    // Salvar as infos na tabela surveys_user
    const surveysUsers = surveysUsersRepository.create({
      users_id: usersAlrearyExists.id,
      surveys_id: surveys_id
    })
    await surveysUsersRepository.save(surveysUsers)    
    // Enviar email para o usuario
    const npsPath = path.resolve(__dirname, "..", "views", "email", "npMail.hbs");

    const variables = {
      name: usersAlrearyExists.name,
      title: surveysAlrearyExists.title,
      description: surveysAlrearyExists.description,
    }

    await sendMailService.execute(email, surveysAlrearyExists.title, variables, npsPath)

    return res.json(surveysUsers)
  }
  
}

export { SendMailController }