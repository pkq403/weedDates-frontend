import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useNavigate } from 'react-router-dom';
import { AuthorizationService } from '@/domain/services/auth/authorization.service';
import React from 'react';

export default function RegisterPage() {
	const navigate = useNavigate();
	const handleSubmit = React.useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			const username = formData.get('username')?.toString() || '';
			const pass = formData.get('password')?.toString() || '';
			const reppass = formData.get('reppassword')?.toString() || '';
			if (!username || !pass) {
				alert('User or Password empty!');
				return null;
			}
			if (pass !== reppass) {
				alert('Passwords do not match!');
				return null;
			}
			try {
				const res = await AuthorizationService.register({
					username: username,
					password: pass,
				});
				if (res) navigate('/login');
				else alert('something went wrong during registry! \n Contact pkq403');
			} catch (err) {
				const res = err as Response;
				res.text().then((text) => {
					alert(text);
				});
			}
		},
		[]
	);
	return (
		<div className='flex flex-col items-center justify-center h-screen w-full'>
			<div className='flex flex-col gap-4 p-5 w-[90vw] h-[130vw] xl:w-[30vw] xl:h-[60vh] md:w-[50vw] md:h-[60vw] sm:w-[50vw] sm:h-[60vw] rounded-lg bg-primary'>
				<div className='w-full justify-items-center'>
					<span className='text-xl sm:text-2xl'>Register</span>
				</div>
				<form
					className='flex flex-col gap-3 content-self-start'
					onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 p-4 bg-terciary-500 rounded-md'>
						<Input
							color='primary'
							label='Username'
							labelPlacement='outside'
							placeholder='Enter the username'
							type='text'
							name='username'
						/>
						<Input
							color='primary'
							label='Password'
							labelPlacement='outside'
							placeholder='Enter your password'
							type='password'
							name='password'
						/>
						<Input
							color='primary'
							label='repeat password'
							labelPlacement='outside'
							placeholder='Repeat password'
							type='password'
							name='reppassword'
						/>
					</div>
					<Button
						className='w-4 ml-auto'
						type='submit'
						color='secondary'
						size='md'
						variant='shadow'>
						{' '}
						Register
					</Button>
				</form>
			</div>
		</div>
	);
}
