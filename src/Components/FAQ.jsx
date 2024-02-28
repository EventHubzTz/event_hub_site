import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const faq = [
    {
        id: "panel1",
        question: "Pugu Marathon ni nini?",
        answer: "Pugu Marathon ni mashindano ya kukimbia kwa wadau wote, njoo ukimbie kwa afya yako."
    },
    {
        id: "panel2",
        question: "Namna ya kulipia?",
        answer: "Malipo yote yatafanyika online kwa kujaza taarifa husika za mkimbiaji husika."
    },
    {
        id: "panel3",
        question: "Je naweza kuchania mbio hizi?",
        answer: "Mtu yeyote anweza kuchangia mbio hizi pasipo na yeye kushiriki kukimbia mbio na washiriki wengine"
    }
]

export default function FAQ() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Container>
            <Typography variant='h5' sx={{ fontWeight: 700, py: 3 }}>
                MASWALI YANAYOULIZWA SANA
            </Typography>
            {faq.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
                            <AccordionSummary aria-controls={item.id} id={item.id}>
                                <Typography>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>
                )
            })}
        </Container>
    );
}