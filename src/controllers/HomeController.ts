import type { Request, Response } from "express";

class HomeController {

    async getHome(Req : Request, Res : Response) {
        Res.render("index", { title: "Monitoria" });
    }
}

export default HomeController;