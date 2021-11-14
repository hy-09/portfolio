import { Button } from "@material-ui/core"
import { FC } from "react"

type Props = {
    variant?: "contained" | "text" | "outlined" | undefined;
    color?: "primary" | "inherit" | "secondary" | "default" | undefined;
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

const SmallButton: FC<Props> = (props) => {
    const { variant="text", color="default", onClick, label, disabled=false } = props
    
    return (
        <Button
            disabled={disabled}
            variant={variant}
            fullWidth 
            size="small" 
            color={color}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default SmallButton
