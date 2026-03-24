import { Box, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
interface ViewAllButtonProps {
    content: string;
    Icon?: React.ElementType;
    href?: string;
}
const ViewAllButton: React.FC<ViewAllButtonProps> = ({ content, Icon, href }) => {
    const navigator = useNavigate()
    return (
        <Button sx={{ background: '#283583', color: 'white', width: { xs: '300px', sm: '350px' } }} onClick={()=>navigator({to:href})}>
            <Box sx={{ display: 'flex', fontSize: '14px', fontWeight: 600 }} >
                {Icon && <Icon sx={{ mr: 1 }} />}
                {content}
            </Box>
        </Button>
    );
}

export default ViewAllButton;