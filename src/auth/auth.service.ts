import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    async signUp(data: SignUpDto){
        console.log(data);
        // Vérifier si utilisateur déjà inscrit
        // Hasher mot de passe
        // Créer utilisateur
        // Email
        // Reponse
        throw new Error("Not implemented")
    }
}
