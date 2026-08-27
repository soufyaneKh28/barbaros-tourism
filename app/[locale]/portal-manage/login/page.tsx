'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, LoaderCircle } from 'lucide-react'
import { signInAction } from '@/app/actions/auth'
import { useParams } from 'next/navigation'

/** Supabase returns one opaque string for a bad email *or* a bad password.
 *  Anything we don't recognise is shown verbatim so nothing is swallowed. */
function readableError(message: string) {
    if (message === 'Invalid login credentials') {
        return "That email and password don't match. Check both and try again."
    }
    return message
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const params = useParams()
    const locale = params?.locale as string || 'en'

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.append('locale', locale)
        const result = await signInAction(formData)

        if (result?.error) {
            setError(readableError(result.error))
            setLoading(false)
        }
    }

    const fieldClass =
        'w-full rounded-xl border border-[var(--auth-line)] bg-white px-4 py-3.5 text-base ' +
        'text-[var(--auth-ink)] placeholder:text-[var(--auth-muted)]/60 transition-colors duration-200 ' +
        'hover:border-[var(--auth-line-strong)] focus:border-[var(--auth-navy)] focus:outline-none ' +
        'focus:ring-4 focus:ring-[var(--auth-navy)]/12 aria-[invalid=true]:border-[var(--auth-danger)]'

    // dir is pinned because the portal's chrome is English-only. Inheriting rtl
    // from an /ar route pushes the sentence punctuation to the wrong end.
    return (
        <div dir="ltr" className="auth-shell min-h-screen bg-[var(--auth-page)] text-[var(--auth-ink)] lg:grid lg:grid-cols-[1.05fr_minmax(30rem,0.95fr)]">

            {/* ── Editorial panel ──────────────────────────────────────────
                Collapses to a banner on small screens rather than vanishing,
                so the portal still identifies itself on a phone. */}
            <aside className="relative isolate flex min-h-[15rem] flex-col justify-between overflow-hidden bg-[var(--auth-navy-deep)] px-6 py-8 sm:px-10 lg:min-h-screen lg:px-14 lg:py-16">
                <Image
                    src="/images/heroBg.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center"
                />
                {/* Multiply drives the photo to a single navy hue; the flat
                    layer and gradient then buy contrast for the type on top. */}
                <div className="absolute inset-0 bg-[var(--auth-navy)] mix-blend-multiply" />
                <div className="absolute inset-0 bg-[var(--auth-navy-deep)]/18" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--auth-navy-deep)] via-[var(--auth-navy-deep)]/10 to-[var(--auth-navy-deep)]/55" />

                {/* Wordmark — set in type rather than the raster logo, whose
                    navy lettering would disappear against this panel. */}
                <div className="auth-rise relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--auth-crimson)]" />
                        <span className="font-cabinet text-2xl font-extrabold leading-none tracking-tight text-white">
                            BARBAROS
                        </span>
                    </div>
                    <p className="mt-2 ms-[1.4rem] font-satoshi text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/55">
                        Tourism &amp; Services
                    </p>
                </div>

                <div className="auth-rise relative z-10 mt-10 lg:mt-0" style={{ animationDelay: '90ms' }}>
                    <p className="max-w-[22ch] font-cabinet text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white">
                        Every journey starts on this screen.
                    </p>
                    <p className="mt-8 max-w-[46ch] border-t border-white/15 pt-5 font-satoshi text-sm leading-relaxed text-white/65">
                        Trips, programs, packages and site content for barbaros.travel are published from here.
                    </p>
                </div>
            </aside>

            {/* ── Sign-in form ─────────────────────────────────────────── */}
            <main className="flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
                <div className="mx-auto w-full max-w-[26rem] lg:mx-0">

                    <div className="auth-rise" style={{ animationDelay: '140ms' }}>
                        <p className="font-satoshi text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--auth-muted)]">
                            Admin Portal
                        </p>
                        <h1 className="mt-3 font-cabinet text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-[var(--auth-navy)]">
                            Sign in
                        </h1>
                        <p className="mt-3 font-satoshi text-base leading-relaxed text-[var(--auth-muted)]">
                            Use the credentials issued to your team account.
                        </p>
                    </div>

                    <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>

                        <div className="auth-rise flex flex-col gap-2" style={{ animationDelay: '200ms' }}>
                            <label
                                htmlFor="email-address"
                                className="font-satoshi text-sm font-bold text-[var(--auth-ink)]"
                            >
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                aria-invalid={error ? true : undefined}
                                aria-describedby={error ? 'signin-error' : undefined}
                                className={fieldClass}
                                placeholder="you@barbaros.travel"
                            />
                        </div>

                        <div className="auth-rise flex flex-col gap-2" style={{ animationDelay: '250ms' }}>
                            <label
                                htmlFor="password"
                                className="font-satoshi text-sm font-bold text-[var(--auth-ink)]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    aria-invalid={error ? true : undefined}
                                    aria-describedby={error ? 'signin-error' : undefined}
                                    className={`${fieldClass} pe-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                    className="absolute end-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--auth-muted)] transition-colors duration-200 hover:bg-[var(--auth-page)] hover:text-[var(--auth-navy)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--auth-navy)]"
                                >
                                    {showPassword
                                        ? <EyeOff className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />
                                        : <Eye className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p
                                id="signin-error"
                                role="alert"
                                className="rounded-xl bg-[var(--auth-danger-surface)] px-4 py-3 font-satoshi text-sm leading-relaxed text-[var(--auth-danger)]"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="auth-rise mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--auth-crimson)] px-6 py-3.5 font-satoshi text-[0.95rem] font-bold text-white transition-[background-color,transform] duration-200 hover:bg-[var(--auth-crimson-hover)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--auth-crimson)] disabled:cursor-not-allowed disabled:bg-[var(--auth-muted)] disabled:active:scale-100"
                            style={{ animationDelay: '300ms' }}
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                    Signing in
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                </>
                            )}
                        </button>
                    </form>

                    <p
                        className="auth-rise mt-8 font-satoshi text-sm text-[var(--auth-muted)]"
                        style={{ animationDelay: '350ms' }}
                    >
                        Locked out? Ask a portal administrator to reset your access.
                    </p>
                </div>
            </main>
        </div>
    )
}
