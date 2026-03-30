import { johncarlo } from "./devInfo";
import { syncProjectsToFileSystem } from "./syncProjects";

export const fileSystem: FileSystem = {
  home: {
    about: `
${johncarlo.about}

Programming Languages:
${johncarlo.code.join(", ")}

Operating Systems:
${johncarlo.operatingSystems.join(", ")}

Tools Used:
${johncarlo.toolsUsed.join(", ")}

IDEs:
${johncarlo.ides.join(", ")}
    `,
    projects: {},
    interests: `
${johncarlo.interests.join("\n")}
    `,
  },
};

syncProjectsToFileSystem(fileSystem);

export interface FileSystem {
  [key: string]: string | FileSystem;
}
