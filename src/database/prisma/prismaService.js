import { PrismaClient } from "@prisma/client";

export class PrismaService {
    _prismaService;

    constructor(prismaService = new PrismaClient()) {
        this._prismaService = prismaService
    }

}