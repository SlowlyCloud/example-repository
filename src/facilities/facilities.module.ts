import { Module,  } from "@nestjs/common";
import { Logger } from "./logging.service";

@Module({
    imports: [Logger],
    exports: [Logger]
})
export class FacilitiesModule { }