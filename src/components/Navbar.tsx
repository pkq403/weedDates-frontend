import { Link } from '@heroui/link';
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/navbar';
import { Avatar, AvatarIcon, Button } from '@heroui/react';
import { Logo } from '@/components/icons';
import { Tooltip } from './Tooltip';
import { AuthorizationService } from '@/domain/services/auth/authorization.service';

export const Navbar = () => {
	return (
		<HeroUINavbar height={'9vh'} position='static'>
			<NavbarBrand className='gap-3 max-w-fit'>
				<Link
					className='flex justify-start items-center gap-1'
					color='foreground'
					href='/'>
					<Logo />
					<p className='font-bold text-inherit'>WeedDates</p>
				</Link>
			</NavbarBrand>
			<NavbarContent justify='end'>
				<NavbarItem>
					<Tooltip
						interactive
						placement='bottom'
						className='bg-black px-[1vw] py-[1vw] border-none'
						content={<LogOutPanel />}>
						<Avatar
							classNames={{
								base: 'bg-gradient-to-br from-primary to-secondary',
								icon: 'text-black/80',
							}}
							icon={<AvatarIcon />}
						/>
					</Tooltip>
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};

const LogOutPanel = () => {
	return (
		<div className='p-0'>
			<Button
				className='min-w-[10px] sm:min-w-[10vh] bg-red-600'
				color='danger'
				onPress={() => {
					AuthorizationService.removeAuthorization();
					window.location.reload();
				}}>
				Log Out
			</Button>
		</div>
	);
};
