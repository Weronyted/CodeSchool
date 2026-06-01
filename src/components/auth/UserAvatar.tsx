import type { User } from 'firebase/auth'

interface UserAvatarProps {
  user: User
  size?: number
}

export function UserAvatar({ user, size = 36 }: UserAvatarProps) {
  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName ?? 'User'}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  const initials = (user.displayName ?? user.email ?? 'U').slice(0, 2).toUpperCase()
  return (
    <div
      className="rounded-full bg-primary dark:bg-primary-dark text-white font-semibold flex items-center justify-center text-sm flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  )
}
