import { PrismaClient } from "@prisma/client";

export class PrismaService {
    _prismaService;

    constructor(prismaService = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL_APP || process.env.DATABASE_URL_TESTS

    })) {
        this._prismaService = prismaService;
    }

}