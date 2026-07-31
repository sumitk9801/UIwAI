export const repairComponent = (code) => {

    return code

        .replace(
            /from\s+['"]eact['"]/g,
            'from "react"'
        )

        .replace(
            /position:\s*['"]elative['"]/g,
            'position: "relative"'
        )

        .replace(
            /fontFamily:\s*['"]ystem-ui/g,
            'fontFamily: "system-ui'
        );

};