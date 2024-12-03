'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { supportWorker } from '../../mockData/workers';
import { visits } from '../../mockData/visits';
import { Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { VisitsProps } from '../../interfaces/visits';

const getVisitHours = (supportWorkerId: number): number => {
	const filteredVisits: VisitsProps[] = visits.filter(
		(obj) => obj.supportWorkerId === supportWorkerId
	);

	let totalHours: number = 0;
	filteredVisits.map((vst) => {
		return (totalHours += (vst.endDateTime - vst.startDateTime) / 1000000);
	});

	return totalHours;
};

const Home = (): JSX.Element => {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Grid container spacing={3}>
					{supportWorker.map((wkr, idx) => {
						const visitHours: number = getVisitHours(
							wkr.supportWorkerId
						);
						const visitHoursPct: string = Number(
							(visitHours / wkr.contractedHours) * 100
						).toFixed(1);

						return (
							<Grid item xs={12} sm={4} key={idx}>
								<Card
									variant='outlined'
									key={idx}
									sx={{ height: '100%' }}
								>
									<CardContent
										sx={{
											bgcolor: '#E8E8E8',
											height: '100%',
										}}
									>
										<Image
											className={styles.logo}
											src={wkr.avatar || '/globe.svg'}
											alt={wkr.name}
											width={100}
											height={100}
											priority
											style={{
												maxHeight: '25vh',
												maxWidth: '25vw',
											}}
										/>
										<div style={{ paddingTop: '20px' }}>
											Worker: {wkr.name}
										</div>
										<div>
											Contracted hours:{' '}
											{wkr.contractedHours}
										</div>
										<div>
											Total visit hours: {visitHours}
										</div>
										<br />
										<LinearProgress
											variant='determinate'
											value={parseInt(visitHoursPct)}
											color='secondary'
										/>
										Progress: {visitHoursPct}%
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</main>
		</div>
	);
};

export default Home;
