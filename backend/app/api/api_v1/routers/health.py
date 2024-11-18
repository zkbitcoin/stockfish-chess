from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t
import chess
import chess.engine

health_router = r = APIRouter()

@r.get("/health")
async def health():
    return "ok"
