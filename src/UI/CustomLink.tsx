import styled from '@emotion/styled';
import { Link, LinkProps } from '@mui/material';

type CustomLinkProps = LinkProps & {
  to: string;
};

const CustomLink = styled(Link)<CustomLinkProps>({
    backgroundColor: '#313742',
    color: "white",
    padding: "10px",
    borderRadius: "10px"
  });


export default CustomLink;