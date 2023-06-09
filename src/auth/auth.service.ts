import { BadRequestException, Injectable } from '@nestjs/common';
import { Supabase } from '../common/supabase';
import { UserCredentials } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: Supabase) {
    }
    async register(registerDto: UserCredentials) {
        try {
            return await this.supabase.getClient().auth.signUp(registerDto)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async login(loginDto: UserCredentials) {
        try {
            return await this.supabase.getClient().auth.signIn(loginDto)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
