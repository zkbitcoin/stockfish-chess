import { Grid } from '@material-ui/core';
import { Game, Navigation } from '../components';

type LayoutType = {
    main: React.ReactElement;
    //panel: React.ReactElement;
    actions?: React.ReactElement;
    children?: React.ReactNode;  // Add this line to allow children
};

//export const Layout = ({ main, panel, children }: LayoutType) => {
export const Layout = ({ main, children }: LayoutType) => {
    return (
        <Grid container>
            <Navigation />
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Grid item>{main}</Grid>
                    {/* <Grid item>{panel}</Grid> */}
                </Grid>
            </Grid>

            {/* Render children here */}
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};
